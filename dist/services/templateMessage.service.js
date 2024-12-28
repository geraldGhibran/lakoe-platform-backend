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
exports.getTemplateMessageById = exports.updateTemplateMessage = exports.deleteTemplateMessage = exports.createTemplateMessage = exports.getAllTemplateMessage = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const getAllTemplateMessage = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.template_Message.findMany({
        where: {
            storeId,
        },
    });
});
exports.getAllTemplateMessage = getAllTemplateMessage;
const createTemplateMessage = (templateMessage) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.template_Message.create({
        data: {
            storeId: Number(templateMessage.storeId),
            message: templateMessage.message,
            title: templateMessage.title,
        },
    });
});
exports.createTemplateMessage = createTemplateMessage;
const deleteTemplateMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.template_Message.delete({
        where: {
            id,
        },
    });
});
exports.deleteTemplateMessage = deleteTemplateMessage;
const updateTemplateMessage = (templateMessage) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.template_Message.update({
        where: {
            id: templateMessage.id,
        },
        data: {
            message: templateMessage.message,
            title: templateMessage.title,
            id: templateMessage.id,
        },
    });
});
exports.updateTemplateMessage = updateTemplateMessage;
const getTemplateMessageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.template_Message.findUnique({
        where: {
            id,
        },
    });
});
exports.getTemplateMessageById = getTemplateMessageById;
