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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.DeleteManyProduct = exports.sortProductByOldest = exports.sortProductByNewest = exports.sortProductByLowestPrice = exports.sortProductByHighestPrice = exports.updateProductById = exports.getProductByUrl = exports.getProductById = exports.deleteProductById = exports.getProductByName = exports.getAllProductByStoreId = void 0;
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const productService = __importStar(require("../services/product.service"));
const variantItemService = __importStar(require("../services/variantItem.service"));
const variantService = __importStar(require("../services/variant.service"));
const variantItemValueService = __importStar(require("../services/variantItemValue.service"));
const getAllProductByStoreId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeId = res.locals.user.storeId;
        const products = yield productService.getAllProductByStoreId(Number(storeId));
        res.send(products);
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).send(err.message);
    }
});
exports.getAllProductByStoreId = getAllProductByStoreId;
const getProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        console.log(name);
        const products = yield productService.getProductByName(name);
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.getProductByName = getProductByName;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body;
        const products = productService.deleteProductById(id);
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.deleteProductById = deleteProductById;
// ini untuk detail product
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body;
        const products = productService.getProductbyId(id);
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.getProductById = getProductById;
const getProductByUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.body;
        const products = productService.getProductByUrl(url);
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.getProductByUrl = getProductByUrl;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, product } = req.body;
        if (req.files) {
            product.images = yield (0, cloudinary_1.default)(req.files);
        }
        const products = productService.updateProductById(id, product);
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.updateProductById = updateProductById;
// sorting Product by highest price
const sortProductByHighestPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store_id = res.locals.user.storeId;
        const products = yield productService.sortProductByHighestPrice(store_id);
        console.log(products);
        // ini dimanipulasi dulu dari service
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.sortProductByHighestPrice = sortProductByHighestPrice;
const sortProductByLowestPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store_id = res.locals.user.storeId;
        const products = yield productService.sortProductByLowestPrice(store_id);
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.sortProductByLowestPrice = sortProductByLowestPrice;
const sortProductByNewest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store_id = res.locals.user.storeId;
        const products = yield productService.sortProductByNewest(store_id);
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.sortProductByNewest = sortProductByNewest;
const sortProductByOldest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store_id = res.locals.user.storeId;
        console.log(store_id);
        const products = yield productService.sortProductByOldest(store_id);
        res.send(products);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.sortProductByOldest = sortProductByOldest;
const DeleteManyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body;
        const result = productService.deleteManyProduct(ids);
        res.send({
            message: 'delete products success',
            result: result,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.DeleteManyProduct = DeleteManyProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.files);
        const product = JSON.parse(req.body.product);
        const productImage = yield (0, cloudinary_1.default)(req.files);
        const variants = JSON.parse(req.body.variant);
        if (product.store_id) {
            product.store_id = Number(res.locals.user.storeId);
        }
        const variantCombinations = JSON.parse(req.body.variantCombination);
        console.log('ini productImage', productImage);
        const productResult = yield productService.createProduct(product, productImage);
        for (const variantCombination of variantCombinations) {
            const variantCombinationResult = yield variantItemValueService.createVariantItemValue(variantCombination, productResult.id);
        }
        for (const variant of variants) {
            const variantResult = yield variantService.createVariant(variant.name, productResult.id);
            const variantItemResult = yield variantItemService.createManyVariantItems(variant.variantItem, variantResult.id);
        }
        console.log(productResult);
        res.send({
            message: 'success',
            product: productResult,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.createProduct = createProduct;
