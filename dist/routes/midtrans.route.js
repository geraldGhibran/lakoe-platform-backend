"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const midtrans_controller_1 = require("../controllers/midtrans.controller");
const express_1 = require("express");
const midtrans = (0, express_1.Router)();
midtrans.post('/', midtrans_controller_1.createSnapTransactionController);
midtrans.post('/editStatus', midtrans_controller_1.updateStatus);
exports.default = midtrans;
