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
exports.getWithdrawsByStoreId = exports.createWithdrawRequest = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const createWithdrawRequest = (storeId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (amount < 5000) {
        throw new Error('Minimal withdraw adalah 5000');
    }
    const store = yield prisma_1.default.store.findUnique({
        where: { user_id: storeId },
    });
    if (!store) {
        throw new Error('Store tidak ditemukan untuk seller ini');
    }
    if (amount > store.amount) {
        throw new Error('Jumlah withdraw melebihi saldo store');
    }
    const withdraw = yield prisma_1.default.withdraw.create({
        data: {
            amount,
            storeId: store.id,
            status: 'PENDING',
        },
    });
    return withdraw;
});
exports.createWithdrawRequest = createWithdrawRequest;
const getWithdrawsByStoreId = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdraws = yield prisma_1.default.withdraw.findMany({
            where: { storeId },
            orderBy: { createAt: 'desc' },
        });
        return withdraws;
    }
    catch (error) {
        throw new Error(`Failed to retrieve withdraws: ${error.message}`);
    }
});
exports.getWithdrawsByStoreId = getWithdrawsByStoreId;
