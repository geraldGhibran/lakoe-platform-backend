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
exports.updateVariantItemValue = exports.createVariantItemValue = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const createVariantItemValue = (variantItemValue, product_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant_item_value.create({
        data: {
            name: variantItemValue.name,
            is_active: true,
            price: Number(variantItemValue.price),
            stock: Number(variantItemValue.stock),
            weight: Number(variantItemValue.weight),
            sku: variantItemValue.sku,
            product_id: product_id,
        },
    });
});
exports.createVariantItemValue = createVariantItemValue;
const updateVariantItemValue = (variantItemValue, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant_item_value.update({
        where: {
            id,
        },
        data: {
            name: variantItemValue.name,
            is_active: true,
            price: Number(variantItemValue.price),
            stock: Number(variantItemValue.stock),
            weight: Number(variantItemValue.weight),
            sku: variantItemValue.sku,
        },
    });
});
exports.updateVariantItemValue = updateVariantItemValue;
