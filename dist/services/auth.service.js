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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const validateData_1 = require("../utils/validateData");
const prisma_1 = __importDefault(require("../libs/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerSchema_1 = require("../libs/validator/registerSchema");
const register = (registerInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const validUser = (0, validateData_1.validateData)(registerSchema_1.registerSchema, registerInfo);
    if (!validUser.success) {
        throw new Error(validUser.error);
    }
    const existedUser = yield prisma_1.default.user.findUnique({
        where: {
            email: registerInfo.email,
        },
    });
    if (existedUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = yield bcrypt_1.default.hash(registerInfo.password, 10);
    const createdUSer = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, registerInfo), { password: hashedPassword, role: 'SELLER', location: undefined, store: {
                create: {
                    name: registerInfo.name,
                },
            } }),
    });
    return createdUSer;
});
exports.register = register;
const login = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: loginInfo.email,
        },
        include: {
            store: true,
        },
    });
    if (!user) {
        throw new Error('Email or Password is Incorrect');
    }
    const isValidPassword = yield bcrypt_1.default.compare(loginInfo.password, user.password);
    if (!isValidPassword) {
        throw new Error('Email or Password is Incorrect');
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
        storeId: (_a = user.store) === null || _a === void 0 ? void 0 : _a.id,
    }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1d',
    });
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    return {
        userWithoutPassword,
        token,
    };
});
exports.login = login;
