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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationsById = exports.deleteLocationById = exports.updateLocationById = exports.addLocation = exports.getLocationsByStoreId = void 0;
const location_service_1 = require("../services/location-service");
const getLocationsByStoreId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { storeId } = req.params;
    if (!storeId) {
        res.status(400).json({ error: 'storeId parameter is required' });
        return;
    }
    try {
        const locations = yield (0, location_service_1.findLocationsByStoreId)(Number(storeId));
        res.status(200).json(locations || []);
    }
    catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ error: 'An error occurred while fetching locations' });
    }
});
exports.getLocationsByStoreId = getLocationsByStoreId;
const addLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locationData = req.body;
        // Validasi input
        if (!locationData.name ||
            !locationData.address ||
            !locationData.postal_code ||
            !locationData.province_code ||
            !locationData.city_district ||
            !locationData.subdistrict ||
            !locationData.village ||
            !locationData.latitude ||
            !locationData.longitude ||
            !locationData.store_id) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }
        const location = yield (0, location_service_1.createLocation)(locationData);
        res.status(201).json({
            message: 'Location created successfully',
            data: location,
        });
    }
    catch (error) {
        console.error('Error creating location:', error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.addLocation = addLocation;
const updateLocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const locationData = req.body;
    if (!id) {
        res.status(400).json({ error: 'Location ID is required' });
        return;
    }
    try {
        const updatedLocation = yield (0, location_service_1.updateLocation)(Number(id), locationData);
        res.status(200).json({
            message: 'Location updated successfully',
            data: updatedLocation,
        });
    }
    catch (error) {
        console.error('Error updating location:', error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.updateLocationById = updateLocationById;
const deleteLocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: 'Location ID is required' });
        return;
    }
    try {
        yield (0, location_service_1.deleteLocation)(Number(id));
        res.status(200).json({ message: 'Location deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting location:', error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteLocationById = deleteLocationById;
const getLocationsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, location_service_1.findLocationsById)(Number(id));
        res.send(result);
    }
    catch (error) {
        const err = error;
        res.status(500).send(err.message);
    }
});
exports.getLocationsById = getLocationsById;
