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
exports.createManyVariant = exports.updateVariant = exports.getVariantsByProductId = exports.getVariantById = exports.createVariant = exports.deleteVariant = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const deleteVariant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant_Item.delete({
        where: {
            id,
        },
    });
});
exports.deleteVariant = deleteVariant;
const createVariant = (variant, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant.create({
        data: {
            name: variant,
            product_id: productId,
        },
    });
});
exports.createVariant = createVariant;
const getVariantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant.findUnique({
        where: {
            id,
        },
    });
});
exports.getVariantById = getVariantById;
const getVariantsByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant.findMany({
        where: {
            product_id: productId,
        },
    });
});
exports.getVariantsByProductId = getVariantsByProductId;
const updateVariant = (variant) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.variant.update({
        where: {
            id: variant.id,
        },
        data: {
            name: variant.name,
        },
    });
});
exports.updateVariant = updateVariant;
const createManyVariant = (variants, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const createVariant = yield prisma_1.default.variant.createMany({
        data: variants.map((variant) => ({
            name: variant,
            product_id: productId,
        })),
    });
    const getVariants = yield prisma_1.default.variant.findMany({
        where: {
            product_id: productId,
        },
    });
    return getVariants;
});
exports.createManyVariant = createManyVariant;
