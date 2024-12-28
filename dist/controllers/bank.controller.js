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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankById = exports.deleteBankById = exports.updateBankById = exports.createBank = exports.getBankAccountByStoreId = void 0;
const bank_service_1 = require("../services/bank.service");
const getBankAccountByStoreId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storeId = res.locals.user.storeId;
    try {
        const bank_accounts = yield (0, bank_service_1.findBankAccountByStoreId)(Number(storeId));
        res.status(200).json(bank_accounts || []);
    }
    catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ error: 'An error occurred while fetching bank accounts' });
    }
});
exports.getBankAccountByStoreId = getBankAccountByStoreId;
const createBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankData = req.body;
        const store_id = res.locals.user.storeId;
        // Validate that bankData contains the necessary fields
        const { bank, acc_number, acc_name } = bankData; // Destructure to ensure all fields are present
        if (!bank || !acc_number || !acc_name) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const bankDatas = yield (0, bank_service_1.createBankAccount)({
            // Pass the required fields to createBankAccount
            bank,
            acc_number,
            acc_name,
            store_id,
        });
        res.status(201).json({
            message: 'Bank Account created successfully',
            data: bankDatas,
        });
    }
    catch (error) {
        console.error('Error creating bank account:', error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.createBank = createBank;
const updateBankById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bankData = req.body;
    if (!id) {
        res.status(400).json({ error: 'Bank Account ID is required' });
        return;
    }
    try {
        const updatedBank = yield (0, bank_service_1.updateBankAccount)(Number(id), bankData);
        res.status(200).json({
            message: 'Bank Account updated successfully',
            data: updatedBank,
        });
    }
    catch (error) {
        console.error('Error updating bank account:', error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.updateBankById = updateBankById;
const deleteBankById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: 'Bank Account ID is required' });
        return;
    }
    try {
        yield (0, bank_service_1.deleteBankAccount)(Number(id));
        res.status(200).json({ message: 'Bank Account deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting bank account:', error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteBankById = deleteBankById;
const getBankById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store_id = res.locals.user.storeId;
        const { id } = req.params;
        const result = yield (0, bank_service_1.findBankAccountById)(Number(id), Number(store_id));
        res.send(result);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.getBankById = getBankById;
