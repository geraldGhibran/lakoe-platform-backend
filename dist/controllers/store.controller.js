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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCourierStoreById = exports.editStoreByUserId = exports.getAllStore = exports.getInformationStoreByUserId = void 0;
const storeService = __importStar(require("../services/store.service"));
const cloudinary_1 = require("../middlewares/cloudinary");
const getInformationStoreByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const stores = yield storeService.getStoreByUserId(Number(user_id));
        res.send(stores);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getInformationStoreByUserId = getInformationStoreByUserId;
const getAllStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield storeService.getAllStore();
        res.send(stores);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllStore = getAllStore;
const editStoreByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = req.body;
        const { user_id } = req.params;
        if (req.files) {
            const files = Array.isArray(req.files)
                ? req.files
                : Object.values(req.files).flat();
            store.logo_img = yield (0, cloudinary_1.uploaderSingle)(files[0]);
        }
        const result = yield storeService.editStoreByUserId(store, Number(user_id));
        res.send({
            message: 'edit store success',
            result: result,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.editStoreByUserId = editStoreByUserId;
const editCourierStoreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courier = req.body;
        const storeId = res.locals.user.storeId;
        const result = yield storeService.editCourierIsActiveStoreById(courier, Number(storeId));
        res.send({
            message: 'edit store courier success',
            result: result,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.editCourierStoreById = editCourierStoreById;
