"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication = (req, res, next) => {
    try {
        /* #swagger.security = [{
                "bearerAuth": []
            }] */
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ message: 'Token not found' });
            return;
        }
        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token not valid' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        if (!decoded || !decoded.username) {
            res.status(401).json({ message: 'Token not valid' });
            return;
        }
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        console.log('Error in authentication middleware:', error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.authentication = authentication;
