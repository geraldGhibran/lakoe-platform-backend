"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getStoreAndWithdrawsAmount = exports.processWithdrawRequest = exports.getWithdrawRequest = exports.getTopSellers = exports.getStoreById = exports.getAllStore = void 0;
const adminService = __importStar(require("../services/admin.service"));
const getAllStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield adminService.getAllStore();
        res.send(stores);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.getAllStore = getAllStore;
const getStoreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const store = yield adminService.getStoreByUserId(Number(id));
        res.send(store);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.getStoreById = getStoreById;
const getTopSellers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield adminService.getTopSellers();
        res.send(stores);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.getTopSellers = getTopSellers;
const getWithdrawRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdraws = yield adminService.getWithdraw();
        res.status(200).json(withdraws);
    }
    catch (error) {
        res.status(500).json({ error: 'Gagal mengambil daftar withdraw' });
    }
});
exports.getWithdrawRequest = getWithdrawRequest;
const processWithdrawRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { withdrawId, action } = req.body;
    try {
        const result = yield adminService.processWithdrawRequest(withdrawId, action);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.processWithdrawRequest = processWithdrawRequest;
const getStoreAndWithdrawsAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield adminService.getStoreAndWithdrawAmount();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getStoreAndWithdrawsAmount = getStoreAndWithdrawsAmount;
