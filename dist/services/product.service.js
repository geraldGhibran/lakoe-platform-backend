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
exports.deleteManyProduct = exports.updateProductById = exports.getProductByUrl = exports.sortProductByOldest = exports.sortProductByNewest = exports.sortProductByLowestPrice = exports.sortProductByHighestPrice = exports.getProductByName = exports.getProductbyId = exports.getAllProductByStoreId = exports.deleteProductById = exports.createProduct = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
// create product
const createProduct = (product, images) => __awaiter(void 0, void 0, void 0, function* () {
    const createProduct = yield prisma_1.default.product.create({
        data: {
            name: product.name,
            description: product.description,
            price: Number(product.price),
            isActive: true,
            minimum_order: Number(product.minimum_order),
            store_id: Number(product.store_id),
            categories_id: Number(product.categories_id),
            url: product.url,
            Height: product.height,
            length: product.length,
            width: product.width,
        },
    });
    if (images) {
        yield prisma_1.default.images.createMany({
            data: images.map((image) => ({
                url: image.url,
                product_id: createProduct.id,
            })),
        });
    }
    return createProduct;
});
exports.createProduct = createProduct;
// delete product
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.product.delete({
        where: {
            id,
        },
    });
});
exports.deleteProductById = deleteProductById;
// get all product
const getAllProductByStoreId = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(storeId);
    return yield prisma_1.default.product.findMany({
        where: {
            store_id: storeId,
        },
        include: {
            image: true,
        },
    });
});
exports.getAllProductByStoreId = getAllProductByStoreId;
// get product by id (untuk detail product)
const getProductbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.product.findUnique({
        where: {
            id,
        },
    });
});
exports.getProductbyId = getProductbyId;
// get product by name
const getProductByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const test = 'ini test';
    const result = yield prisma_1.default.product.findMany({
        where: {
            name: {
                contains: name,
            },
        },
        include: {
            image: true,
            Variant: true,
            variant_Item_values: true,
            Store: {
                include: {
                    Locations: true,
                    couriers: true,
                },
            },
        },
    });
    return result;
});
exports.getProductByName = getProductByName;
const sortProductByHighestPrice = (store_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.product.findMany({
        where: {
            store_id,
        },
        orderBy: {
            price: 'asc',
        },
    });
});
exports.sortProductByHighestPrice = sortProductByHighestPrice;
const sortProductByLowestPrice = (store_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.product.findMany({
        where: {
            store_id,
        },
        orderBy: {
            price: 'desc',
        },
    });
});
exports.sortProductByLowestPrice = sortProductByLowestPrice;
const sortProductByNewest = (store_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.product.findMany({
        where: {
            store_id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
});
exports.sortProductByNewest = sortProductByNewest;
const sortProductByOldest = (store_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.product.findMany({
        where: {
            store_id,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
});
exports.sortProductByOldest = sortProductByOldest;
const getProductByUrl = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.product.findFirst({
        where: {
            url,
        },
    });
});
exports.getProductByUrl = getProductByUrl;
const updateProductById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.default.product.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            minimum_order: Number(data.minimum_order),
            store_id: Number(data.store_id),
            categories_id: Number(data.categories_id),
            url: data.url,
        },
    });
    // const images = await prisma.images.createMany({
    //   data: data.images.map((image) => ({
    //     url: image.url,
    //     product_id: id,
    //   })),
    // });
    return {
        product,
        // images,
    };
});
exports.updateProductById = updateProductById;
const deleteManyProduct = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.product.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
});
exports.deleteManyProduct = deleteManyProduct;
