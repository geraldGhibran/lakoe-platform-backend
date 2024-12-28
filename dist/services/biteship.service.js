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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusByWaybill = exports.mapStatusToInvoice = exports.getAreaId = exports.getListCouriers = exports.trackingOrder = exports.createOrder = exports.calculateShippingRates = void 0;
const biteship_1 = __importDefault(require("../utils/biteship"));
const prisma_1 = __importDefault(require("../libs/prisma"));
const client_1 = require("@prisma/client");
const calculateShippingRates = (params) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { origin_area_id, destination_area_id, couriers, items } = params;
    try {
        const response = yield biteship_1.default.post('/rates/couriers', {
            origin_area_id,
            destination_area_id,
            couriers,
            items,
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to calculate shipping rates: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
    }
});
exports.calculateShippingRates = calculateShippingRates;
const createOrder = (invoiceId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const invoice = yield prisma_1.default.invoices.findUnique({
            where: { id: invoiceId },
            include: {
                store: {
                    include: {
                        Locations: true,
                        user: true,
                    },
                },
                Product: true,
                Courier: true,
            },
        });
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        const originLocation = invoice.store.Locations.find((location) => location.is_main_location);
        if (!originLocation) {
            throw new Error('Store main location not found');
        }
        const payload = {
            origin_contact_name: invoice.store.name,
            origin_contact_phone: invoice.store.user.phone
                ? invoice.store.user.phone.toString()
                : '',
            origin_address: originLocation.address,
            origin_note: 'Main store location',
            origin_postal_code: originLocation.postal_code,
            destination_contact_name: invoice.receiver_name,
            destination_contact_phone: invoice.receiver_phone
                ? invoice.receiver_phone.toString()
                : '',
            destination_contact_email: invoice.receiver_email,
            destination_address: invoice.receiver_address,
            destination_postal_code: invoice.receiver_postal_code,
            destination_note: 'Please handle with care',
            courier_company: ((_a = invoice.Courier) === null || _a === void 0 ? void 0 : _a.courier_code) || 'jne',
            courier_type: ((_b = invoice.Courier) === null || _b === void 0 ? void 0 : _b.courier_service_code) || 'reg',
            courier_insurance: 0,
            delivery_type: 'now',
            order_note: invoice.receiver_district || 'No specific notes',
            metadata: {},
            items: invoice.Product.map((product) => ({
                name: product.name,
                value: product.price,
                quantity: 1,
                weight: product.Height || 0,
            })),
        };
        const response = yield biteship_1.default.post('/orders', payload);
        const { id: biteshipOrderId, courier } = response.data;
        // console.log(response.data);
        const createdCourier = yield prisma_1.default.courier.create({
            data: {
                courier_code: courier.company,
                courier_service_name: courier.type,
                courier_service_code: courier.type,
                price: invoice.courier_price,
                resi: courier.waybill_id,
                link: courier.link,
                invoice_id: invoice.id,
            },
        });
        // Update status invoice setelah order berhasil dibuat
        yield prisma_1.default.invoices.update({
            where: { id: invoice.id },
            data: {
                status: 'PROCESS',
            },
        });
        return { biteshipOrderId, courier: createdCourier };
    }
    catch (error) {
        throw new Error(`Failed to create order: ${((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.code) || error.message}`);
    }
});
exports.createOrder = createOrder;
const trackingOrder = (resi, service) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield biteship_1.default.get(`/trackings/${resi}/couriers/${service}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to tracking order: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
    }
});
exports.trackingOrder = trackingOrder;
const getListCouriers = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const TARGET_COURIERS = [
        'GOJEK',
        'GRAB',
        'JNE',
        'J&T',
        'SICEPAT',
        'TIKI',
        'ANTERAJA',
    ];
    try {
        const response = yield biteship_1.default.get(`/couriers`);
        const couriers = (_a = response.data) === null || _a === void 0 ? void 0 : _a.couriers;
        const filteredCouriers = couriers.filter((courier) => {
            var _a;
            return TARGET_COURIERS.includes((_a = courier.courier_name) === null || _a === void 0 ? void 0 : _a.toUpperCase()) &&
                ['Reguler', 'Instant'].includes(courier.courier_service_name);
        });
        const formattedData = filteredCouriers.map((courier) => ({
            courier_code: courier.courier_code,
            courier_service_name: courier.courier_service_name,
            courier_service_code: courier.courier_service_code,
            resi: '12323',
            storeId: storeId,
        }));
        const store = yield prisma_1.default.store.findUnique({
            where: { id: storeId },
        });
        if (!store) {
            throw new Error('Store not found');
        }
        const createCourierStore = yield prisma_1.default.courier.createMany({
            data: formattedData,
        });
        return createCourierStore;
    }
    catch (error) {
        throw new Error(`Failed to get list couriers: ${((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error.message}`);
    }
});
exports.getListCouriers = getListCouriers;
const getAreaId = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield biteship_1.default.get(`/maps/areas`, {
            params: {
                countries: 'ID',
                input,
                type: 'single',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to get list couriers: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
    }
});
exports.getAreaId = getAreaId;
const mapStatusToInvoice = (biteshipStatus) => {
    const statusMap = {
        courier_not_found: client_1.StatusInvoice.CANCELED,
        picking_up: client_1.StatusInvoice.WAIT_TO_PICKUP,
        allocated: client_1.StatusInvoice.WAIT_TO_PICKUP,
        dropping_off: client_1.StatusInvoice.DELIVERING,
        picked: client_1.StatusInvoice.DELIVERING,
        delivered: client_1.StatusInvoice.DELIVERED,
    };
    const mappedStatus = statusMap[biteshipStatus];
    if (!mappedStatus) {
        throw new Error(`Unhandled Biteship status: ${biteshipStatus}`);
    }
    return mappedStatus;
};
exports.mapStatusToInvoice = mapStatusToInvoice;
const updateStatusByWaybill = (courierWaybillId, biteshipStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mappedStatus = (0, exports.mapStatusToInvoice)(biteshipStatus);
        const updatedOrder = yield prisma_1.default.invoices.updateMany({
            where: { Courier: { resi: courierWaybillId } },
            data: { status: mappedStatus },
        });
        if (updatedOrder.count === 0) {
            throw new Error(`Order with waybill ID ${courierWaybillId} not found`);
        }
        if (mappedStatus === client_1.StatusInvoice.DELIVERED) {
            const invoice = yield prisma_1.default.invoices.findFirst({
                where: { Courier: { resi: courierWaybillId } },
                include: { store: true },
            });
            if (invoice) {
                yield prisma_1.default.store.update({
                    where: { id: invoice.store_id },
                    data: {
                        amount: {
                            increment: invoice.amount,
                        },
                    },
                });
            }
        }
        return { success: true, updatedOrder, status: mappedStatus };
    }
    catch (error) {
        throw new Error(`Failed to update status: ${error.message}`);
    }
});
exports.updateStatusByWaybill = updateStatusByWaybill;
