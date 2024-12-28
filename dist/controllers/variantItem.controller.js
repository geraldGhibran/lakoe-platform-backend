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
exports.getAllVariantItemByVariant = exports.updateVariantItem = exports.deleteVariantItem = exports.createVariantItem = void 0;
const variantItemService = __importStar(require("../services/variantItem.service"));
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const createVariantItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const variantItem = req.body;
        if (req.files) {
            if (req.files) {
                variantItem.images = yield (0, cloudinary_1.default)(req.files);
            }
            else {
                throw new Error('No image uploaded');
            }
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createVariantItem = createVariantItem;
const deleteVariantItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body;
        const variant = variantItemService.deleteVariantItem(id);
        res.send(variant);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteVariantItem = deleteVariantItem;
const updateVariantItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const variant = req.body;
        if (req.files) {
            variant.images = yield (0, cloudinary_1.default)(req.files);
        }
        yield variantItemService.updateVariantItem(variant, variant.id);
        res.send(variant);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateVariantItem = updateVariantItem;
const getAllVariantItemByVariant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const variantId = req.body;
        const result = yield variantItemService.getAllVariantItemByVariant(variantId);
        res.send(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllVariantItemByVariant = getAllVariantItemByVariant;
