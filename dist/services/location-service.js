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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.findLocationsById = exports.findLocationsByStoreId = void 0;
const biteship_service_1 = require("../services/biteship.service");
const prisma_1 = __importDefault(require("../libs/prisma"));
const findLocationsByStoreId = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield prisma_1.default.locations.findMany({
            where: {
                store_id: storeId,
            },
            orderBy: [
                {
                    is_main_location: 'desc',
                },
                // {
                //   createdAt: 'asc',
                // },
            ],
        });
        return locations;
    }
    catch (error) {
        throw new Error(`Error fetching locations for store_id ${storeId}: ${error.message}`);
    }
});
exports.findLocationsByStoreId = findLocationsByStoreId;
const findLocationsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.locations.findUnique({
        where: {
            id,
        },
    });
});
exports.findLocationsById = findLocationsById;
const createLocation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, postal_code, province, province_code, city_district, city_district_code, subdistrict, subdistrict_code, village, latitude, longitude, store_id, is_main_location, } = data;
    const area_input = province + ', ' + city_district + ', ' + postal_code;
    const area_id = yield (0, biteship_service_1.getAreaId)(area_input);
    const store = yield prisma_1.default.store.findUnique({
        where: { id: store_id },
    });
    if (!store) {
        throw new Error('Store not found');
    }
    if (is_main_location) {
        yield prisma_1.default.locations.updateMany({
            where: { store_id },
            data: { is_main_location: false },
        });
    }
    const location = yield prisma_1.default.locations.create({
        data: {
            name,
            address,
            postal_code,
            province,
            province_code,
            city_district,
            city_district_code,
            subdistrict,
            area_id: area_id.areas[0].id,
            subdistrict_code,
            village,
            latitude,
            longitude,
            store_id,
            is_main_location: is_main_location || false,
        },
    });
    return location;
});
exports.createLocation = createLocation;
const updateLocation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { is_main_location } = data, updateData = __rest(data, ["is_main_location"]);
    const location = yield prisma_1.default.locations.findUnique({ where: { id } });
    if (!location) {
        throw new Error('Location not found');
    }
    const updatedLocation = yield prisma_1.default.locations.update({
        where: { id },
        data: updateData,
    });
    if (is_main_location) {
        yield prisma_1.default.locations.updateMany({
            where: {
                store_id: location.store_id,
                id: { not: id },
            },
            data: { is_main_location: false },
        });
        yield prisma_1.default.locations.update({
            where: { id },
            data: { is_main_location: true },
        });
    }
    return { updatedLocation, is_main_location };
});
exports.updateLocation = updateLocation;
const deleteLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const location = yield prisma_1.default.locations.findUnique({ where: { id } });
    if (!location) {
        throw new Error('Location not found');
    }
    yield prisma_1.default.locations.delete({ where: { id } });
});
exports.deleteLocation = deleteLocation;
