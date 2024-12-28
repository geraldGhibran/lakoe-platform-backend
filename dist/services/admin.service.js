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
exports.getStoreAndWithdrawAmount = exports.processWithdrawRequest = exports.getWithdraw = exports.getTopSellers = exports.getStoreByUserId = exports.getAllStore = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const getAllStore = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield prisma_1.default.store.findMany({
            where: {
                user: {
                    role: 'SELLER',
                },
            },
            include: {
                Locations: true,
                bankAccount: true,
                products: true,
                user: true,
                invoices: true,
            },
        });
        return stores;
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.getAllStore = getAllStore;
const getStoreByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield prisma_1.default.store.findUnique({
            where: {
                user_id,
            },
            include: {
                Locations: true,
                bankAccount: true,
                products: {
                    include: {
                        image: true,
                    },
                },
                user: true,
                Withdraw: {
                    where: {
                        status: 'PENDING',
                    },
                    select: {
                        amount: true,
                    },
                },
            },
        });
        const totalPendingWithdrawAmount = (stores === null || stores === void 0 ? void 0 : stores.Withdraw.reduce((sum, withdraw) => sum + withdraw.amount, 0)) || 0;
        return Object.assign(Object.assign({}, stores), { totalPendingWithdrawAmount });
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.getStoreByUserId = getStoreByUserId;
const getTopSellers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield prisma_1.default.store.findMany({
            include: {
                Locations: true,
                bankAccount: true,
                products: true,
                user: true,
            },
            orderBy: {
                amount: 'desc',
            },
            take: 1,
        });
        return stores;
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.getTopSellers = getTopSellers;
const getWithdraw = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdraws = yield prisma_1.default.withdraw.findMany({
            where: { status: 'PENDING' },
            include: {
                store: {
                    select: {
                        name: true,
                        logo_img: true,
                        bankAccount: true,
                    },
                },
            },
            orderBy: { createAt: 'desc' },
        });
        return withdraws;
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.getWithdraw = getWithdraw;
const processWithdrawRequest = (withdrawId, action) => __awaiter(void 0, void 0, void 0, function* () {
    const withdraw = yield prisma_1.default.withdraw.findUnique({
        where: { id: withdrawId },
        include: { store: true },
    });
    if (!withdraw) {
        throw new Error('Withdraw request tidak ditemukan');
    }
    if (withdraw.status !== 'PENDING') {
        throw new Error('Withdraw request sudah diproses sebelumnya');
    }
    if (action === 'accept') {
        yield prisma_1.default.$transaction([
            prisma_1.default.withdraw.update({
                where: { id: withdrawId },
                data: { status: 'SUCCESS' },
            }),
            prisma_1.default.store.update({
                where: { id: withdraw.storeId },
                data: { amount: withdraw.store.amount - withdraw.amount },
            }),
        ]);
    }
    else if (action === 'reject') {
        yield prisma_1.default.withdraw.update({
            where: { id: withdrawId },
            data: { status: 'FAILED' },
        });
    }
    else {
        throw new Error("Aksi tidak valid. Hanya 'accept' atau 'reject' yang diperbolehkan.");
    }
    return {
        message: `Withdraw request ${action === 'accept' ? 'accepted' : 'rejected'}`,
    };
});
exports.processWithdrawRequest = processWithdrawRequest;
const getStoreAndWithdrawAmount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield prisma_1.default.store.findMany({
            select: {
                id: true,
                amount: true,
            },
        });
        const totalStoreAmount = stores.reduce((sum, store) => sum + store.amount, 0);
        const pendingWithdraws = yield prisma_1.default.withdraw.findMany({
            where: {
                status: 'PENDING',
            },
            select: {
                amount: true,
            },
        });
        const totalPendingAmount = pendingWithdraws.reduce((sum, withdraw) => sum + withdraw.amount, 0);
        const successWithdraws = yield prisma_1.default.withdraw.findMany({
            where: {
                status: 'SUCCESS',
            },
            select: {
                amount: true,
            },
        });
        const totalSuccessAmount = successWithdraws.reduce((sum, withdraw) => sum + withdraw.amount, 0);
        const feeAmount = yield prisma_1.default.invoices.findMany({
            where: {
                status: 'DELIVERED',
            },
            select: {
                service_charge: true,
            },
        });
        const totalFeeAmount = feeAmount.reduce((sum, invoice) => sum + invoice.service_charge, 0);
        return {
            stores,
            pendingWithdraws,
            successWithdraws,
            totalStoreAmount,
            totalPendingAmount,
            totalSuccessAmount,
            totalFeeAmount,
        };
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.getStoreAndWithdrawAmount = getStoreAndWithdrawAmount;
