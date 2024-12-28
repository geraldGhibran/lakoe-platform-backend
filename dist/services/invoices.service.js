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
exports.getInvoiceById = exports.getInvoices = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const getInvoices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield prisma_1.default.invoices.findMany({
            include: {
                store: true,
                Courier: true,
                Product: {
                    include: {
                        image: true,
                    },
                },
            },
        });
        return invoices;
    }
    catch (error) {
        throw new Error(`Failed to fetch invoices: ${error.message}`);
    }
});
exports.getInvoices = getInvoices;
const getInvoiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoice = yield prisma_1.default.invoices.findUnique({
            where: { id },
            include: {
                store: true,
                Courier: true,
                Product: {
                    include: {
                        variant_Item_values: true,
                    },
                },
            },
        });
        const transformedData = invoice
            ? Object.assign(Object.assign({}, invoice), { receiver_phone: invoice.receiver_phone
                    ? invoice.receiver_phone.toString()
                    : '' }) : null;
        if (!invoice) {
            throw new Error(`Invoice with ID ${id} not found`);
        }
        return transformedData;
    }
    catch (error) {
        throw new Error(`Failed to fetch invoice by ID: ${error.message}`);
    }
});
exports.getInvoiceById = getInvoiceById;
