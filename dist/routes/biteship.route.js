"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const biteship_controller_1 = require("../controllers/biteship.controller");
const authentication_1 = require("../middlewares/authentication");
const biteshipRoute = (0, express_1.Router)();
biteshipRoute.post('/rates', biteship_controller_1.getShippingRates);
biteshipRoute.post('/orders', biteship_controller_1.createShippingOrder);
biteshipRoute.get('/tracking', biteship_controller_1.getTracking);
biteshipRoute.get('/couriers', authentication_1.authentication, biteship_controller_1.getCouriers);
biteshipRoute.get('/areaId', biteship_controller_1.getAreaIds);
biteshipRoute.post('/webhook', (req, res) => {
    (0, biteship_controller_1.handleWebhook)(req, res);
});
// biteshipRoute.get(
//   '/status/:courierWaybillId',
//   (req: Request, res: Response) => {
//     handleWebhook(req, res);
//   },
// );
exports.default = biteshipRoute;
