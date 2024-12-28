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
exports.deleteBankAccount = exports.updateBankAccount = exports.findBankAccountByStoreId = exports.findBankAccountById = void 0;
exports.createBankAccount = createBankAccount;
const prisma_1 = __importDefault(require("../libs/prisma"));
const findBankAccountById = (id, store_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.bankAccount.findUnique({
        where: {
            id,
            store_id,
        },
    });
});
exports.findBankAccountById = findBankAccountById;
const findBankAccountByStoreId = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankAccount = yield prisma_1.default.bankAccount.findMany({
            where: {
                store_id: storeId,
            },
        });
        return bankAccount;
    }
    catch (error) {
        throw new Error(`Error fetching bankAccount for store_id ${storeId}: ${error.message}`);
    }
});
exports.findBankAccountByStoreId = findBankAccountByStoreId;
const updateBankAccount = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = __rest(data, []);
    const bankAccount = yield prisma_1.default.bankAccount.findUnique({ where: { id } });
    if (!bankAccount) {
        throw new Error('Bank Account not found');
    }
    const updatedBankAccount = yield prisma_1.default.bankAccount.update({
        where: { id },
        data: updateData,
    });
    return { updatedBankAccount };
});
exports.updateBankAccount = updateBankAccount;
const deleteBankAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bankAccount = yield prisma_1.default.bankAccount.findUnique({ where: { id } });
    if (!bankAccount) {
        throw new Error('Bank account not found');
    }
    yield prisma_1.default.bankAccount.delete({ where: { id } });
});
exports.deleteBankAccount = deleteBankAccount;
function createBankAccount(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingAccount = yield prisma_1.default.bankAccount.findFirst();
        if (existingAccount) {
            throw new Error('A bank account already exists. Only one record is allowed.');
        }
        return yield prisma_1.default.bankAccount.create({
            data,
        });
    });
}
