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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.createSnapTransactionController = void 0;
const midtrans_service_1 = require("../services/midtrans.service");
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
const createSnapTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_details, items, courierPrice } = req.body;
    try {
        const transaction = yield (0, midtrans_service_1.createSnapTransactionWithInvoice)(customer_details, items, courierPrice);
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error('Controller Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.createSnapTransactionController = createSnapTransactionController;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { transaction_status, order_id } = _a, rest = __rest(_a, ["transaction_status", "order_id"]);
        console.log('Received Webhook:', req.body);
        console.log(transaction_status, order_id);
        if (transaction_status === 'settlement') {
            yield (0, midtrans_service_1.updateStatusInvoice)(order_id, StatusInvoice.PAID);
        }
        res.send('success');
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).send(err.message);
    }
});
exports.updateStatus = updateStatus;
