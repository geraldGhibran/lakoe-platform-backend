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
exports.editCourierListValue = exports.editCourierIsActiveStoreById = exports.editStoreByUserId = exports.getAllStore = exports.getStoreByUserId = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const getStoreByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield prisma_1.default.store.findUnique({
            where: {
                user_id,
            },
            include: {
                Locations: true,
                bankAccount: true,
                products: true,
                couriers: {
                    orderBy: {
                        id: 'asc',
                    },
                },
                user: true,
            },
        });
        const courier_data = (stores === null || stores === void 0 ? void 0 : stores.couriers)
            ? stores.couriers
                .filter((item) => item.is_active)
                .map((item) => item.courier_code)
                .join(',')
            : '';
        (0, exports.editCourierListValue)(courier_data, user_id);
        return stores;
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.getStoreByUserId = getStoreByUserId;
const getAllStore = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield prisma_1.default.store.findMany({
            include: {
                Locations: true,
                bankAccount: true,
                products: true,
                user: true,
            },
        });
        return stores;
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.getAllStore = getAllStore;
const editStoreByUserId = (store, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ini dari logo_img', store.logo_img);
    try {
        const stores = yield prisma_1.default.store.update({
            where: { user_id },
            data: {
                name: store.name,
                slogan: store.slogan,
                description: store.description,
                logo_img: store.logo_img || '',
            },
        });
        return stores;
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.editStoreByUserId = editStoreByUserId;
const editCourierIsActiveStoreById = (courier, storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield prisma_1.default.courier.update({
            where: { id: courier.id, storeId: storeId },
            data: {
                is_active: courier.is_active,
            },
        });
        return stores;
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.editCourierIsActiveStoreById = editCourierIsActiveStoreById;
const editCourierListValue = (courier, storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield prisma_1.default.store.update({
            where: { id: storeId },
            data: {
                courier: courier,
            },
        });
        return stores;
    }
    catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
    }
});
exports.editCourierListValue = editCourierListValue;
