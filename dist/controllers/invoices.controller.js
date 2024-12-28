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
exports.getInvoiceDetails = exports.getAllInvoices = void 0;
const invoices_service_1 = require("../services/invoices.service");
const getAllInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield (0, invoices_service_1.getInvoices)();
        res.status(200).json({ invoices });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllInvoices = getAllInvoices;
const getInvoiceDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const invoice = yield (0, invoices_service_1.getInvoiceById)(Number(id));
        res.status(200).json({ invoice });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getInvoiceDetails = getInvoiceDetails;
