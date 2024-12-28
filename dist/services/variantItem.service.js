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
exports.createManyVariantItems = exports.updateVariantItem = exports.deleteVariantItem = exports.createVariantItem = exports.getAllVariantItemByVariant = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const getAllVariantItemByVariant = (variantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant_Item.findMany({
        where: {
            variant_id: variantId,
        },
    });
});
exports.getAllVariantItemByVariant = getAllVariantItemByVariant;
const createVariantItem = (variantItem, variantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant_Item.create({
        data: {
            name: variantItem,
            variant_id: variantId,
        },
    });
});
exports.createVariantItem = createVariantItem;
const deleteVariantItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant_Item.delete({
        where: {
            id,
        },
    });
});
exports.deleteVariantItem = deleteVariantItem;
const updateVariantItem = (variantItem, variantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant_Item.update({
        where: {
            id: variantId,
        },
        data: {
            name: variantItem.name,
        },
    });
});
exports.updateVariantItem = updateVariantItem;
const createManyVariantItems = (variantItem, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant_Item.createMany({
        data: variantItem.map((item) => ({
            name: item,
            variant_id: id,
        })),
    });
});
exports.createManyVariantItems = createManyVariantItems;
