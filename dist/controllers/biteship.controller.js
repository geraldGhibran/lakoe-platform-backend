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
exports.getInvoicesStatus = exports.handleWebhook = exports.getAreaIds = exports.getCouriers = exports.getTracking = exports.createShippingOrder = exports.getShippingRates = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const biteship_service_1 = require("../services/biteship.service");
const getShippingRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin_area_id, destination_area_id, couriers, items } = req.body;
    try {
        const rates = yield (0, biteship_service_1.calculateShippingRates)({
            origin_area_id,
            destination_area_id,
            couriers,
            items,
        });
        res.status(200).json(rates);
    }
    catch (error) {
        if (!origin_area_id || !destination_area_id) {
            res.status(400).json({ error: 'Origin and destination are required' });
            return;
        }
        res.status(500).json({ error: error.message });
    }
});
exports.getShippingRates = getShippingRates;
const createShippingOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { invoiceId } = req.body;
    if (!invoiceId) {
        res.status(400).json({ error: 'Invoice ID is required' });
        return;
    }
    try {
        const order = yield (0, biteship_service_1.createOrder)(invoiceId);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createShippingOrder = createShippingOrder;
const getTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resi, service } = req.body;
    try {
        const tracking = yield (0, biteship_service_1.trackingOrder)(resi, service);
        res.status(201).json(tracking);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTracking = getTracking;
const getCouriers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeId = res.locals.user.storeId;
        const couriers = yield (0, biteship_service_1.getListCouriers)(storeId);
        res.status(200).json(couriers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCouriers = getCouriers;
const getAreaIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.query;
    // Validate required parameters
    if (!input) {
        res.status(400).json({
            error: 'Missing required query parameters:  input',
        });
        return;
    }
    try {
        const areaIds = yield (0, biteship_service_1.getAreaId)(input);
        res.status(200).json(areaIds.areas[0].id);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAreaIds = getAreaIds;
const handleWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(200).json({ message: 'OK' });
        }
        const { courier_waybill_id, status } = req.body;
        // console.log('cek sini', req.body);
        if (!courier_waybill_id || !status) {
            return res.status(400).json({ error: 'Invalid payload' });
        }
        const result = yield (0, biteship_service_1.updateStatusByWaybill)(courier_waybill_id, status);
        res.status(200).json({
            message: 'Status updated successfully',
            updatedStatus: result.status,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.handleWebhook = handleWebhook;
const getInvoicesStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courierWaybillId } = req.params;
        const invoices = yield prisma_1.default.invoices.findFirst({
            where: { Courier: { resi: courierWaybillId } },
            select: { status: true },
        });
        if (!invoices) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(invoices);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getInvoicesStatus = getInvoicesStatus;
