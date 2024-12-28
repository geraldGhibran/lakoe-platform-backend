"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoices_controller_1 = require("../controllers/invoices.controller");
const express_1 = require("express");
const invoiceRoute = (0, express_1.Router)();
invoiceRoute.get('/', invoices_controller_1.getAllInvoices);
invoiceRoute.get('/:id', invoices_controller_1.getInvoiceDetails);
exports.default = invoiceRoute;
