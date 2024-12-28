"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusInvoice = exports.createSnapTransactionWithInvoice = void 0;
const client_1 = require("@prisma/client");
const midtrans_node_client_1 = require("midtrans-node-client");
const uuid_1 = require("uuid");
var StatusInvoice;
(function (StatusInvoice) {
    StatusInvoice["PROCESS"] = "PROCESS";
    StatusInvoice["CANCELED"] = "CANCELED";
    StatusInvoice["WAIT_TO_PICKUP"] = "WAIT_TO_PICKUP";
    StatusInvoice["DELIVERED"] = "DELIVERED";
    StatusInvoice["UNPAID"] = "UNPAID";
    StatusInvoice["PAID"] = "PAID";
    StatusInvoice["DELIVERING"] = "DELIVERING";
})(StatusInvoice || (StatusInvoice = {}));
const prisma = new client_1.PrismaClient();
const snap = new midtrans_node_client_1.MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
const createSnapTransactionWithInvoice = (customerDetails, items, courierPrice) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const order_id = (0, uuid_1.v4)();
        const itemDetails = yield Promise.all(items.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ id, quantity }) {
            var _b;
            const variant = yield prisma.variant_item_value.findUnique({
                where: { id },
                include: { product: { include: { Store: true } } },
            });
            if (!variant || !variant.is_active) {
                throw new Error(`Variant with id ${id} not found or not active.`);
            }
            if (variant.stock < quantity) {
                throw new Error(`Insufficient stock for variant ${variant.name}.`);
            }
            // Update stock
            yield prisma.variant_item_value.update({
                where: { id },
                data: { stock: variant.stock - quantity },
            });
            return {
                id: variant.id,
                name: variant.name,
                price: variant.price,
                quantity,
                productId: variant.product.id,
                storeId: (_b = variant.product.Store) === null || _b === void 0 ? void 0 : _b.id,
            };
        })));
        const storeId = (_a = itemDetails[0]) === null || _a === void 0 ? void 0 : _a.storeId;
        if (!storeId) {
            throw new Error('Unable to determine store_id from the provided items.');
        }
        const gross_amount = itemDetails.reduce((total, item) => total + item.price * item.quantity, 0) +
            2500 +
            courierPrice;
        // Create invoice in database
        const invoice = yield prisma.invoices.create({
            data: {
                amount: gross_amount - 2500 - courierPrice,
                total_amount: gross_amount,
                courier_price: courierPrice,
                service_charge: 2500,
                status: 'UNPAID',
                receiver_name: customerDetails.name,
                receiver_phone: customerDetails.phone.toString(),
                receiver_address: customerDetails.address,
                receiver_postal_code: customerDetails.postal_code,
                receiver_longitude: customerDetails.receiver_longitude,
                receiver_latitude: customerDetails.receiver_latitude,
                receiver_district: customerDetails.receiver_district,
                receiver_email: customerDetails.email,
                invoice_id: order_id,
                store_id: storeId,
                variantItemValues: {
                    connect: itemDetails.map((item) => ({ id: item.id })),
                },
                Product: {
                    connect: itemDetails.map((item) => ({ id: item.productId })),
                },
            },
        });
        const transactionData = {
            transaction_details: {
                order_id: invoice.invoice_id,
                gross_amount,
            },
            customer_details: {
                first_name: customerDetails.name,
                email: customerDetails.email,
                phone: customerDetails.phone,
            },
        };
        try {
            const snapResponse = yield snap.createTransaction(transactionData);
            return snapResponse;
        }
        catch (midtransError) {
            console.error('Midtrans Error:', ((_b = midtransError.response) === null || _b === void 0 ? void 0 : _b.data) || midtransError.message);
            throw new Error(`Failed to create Snap transaction: ${((_d = (_c = midtransError.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || midtransError.message}`);
        }
    }
    catch (error) {
        throw new Error(`Failed to create Snap transaction with invoice: ${error.message}`);
    }
});
exports.createSnapTransactionWithInvoice = createSnapTransactionWithInvoice;
const updateStatusInvoice = (invoice_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(status in StatusInvoice)) {
            throw new Error(`Invalid status value: ${status}`);
        }
        const result = yield prisma.invoices.update({
            where: { invoice_id },
            data: {
                status: status,
            },
        });
        return result;
    }
    catch (error) {
        throw new Error(`Failed to update status invoice with error: ${error.message}`);
    }
});
exports.updateStatusInvoice = updateStatusInvoice;
