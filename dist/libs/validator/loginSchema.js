"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username is required'),
    password: zod_1.z.string().min(6, 'Password at least 6 character'),
});
