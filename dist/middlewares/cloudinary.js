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
exports.uploaderSingle = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dn7do8srf',
    api_key: process.env.CLOUDINARY_API_KEY || '926628528498445',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'LWuWaaUBs8hoRGRYJ3BDFmsG9Gw',
});
const uploader = (files) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(files);
    const urls = [];
    yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
        const uploadedFile = yield cloudinary_1.v2.uploader.upload(dataURI, {
            folder: 'lakoe_platform',
        });
        urls.push({
            url: uploadedFile.secure_url,
        });
    })));
    return urls;
});
const uploaderSingle = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
    const uploadedFile = yield cloudinary_1.v2.uploader.upload(dataURI, {
        folder: 'lakoe_platform',
    });
    return uploadedFile.secure_url;
});
exports.uploaderSingle = uploaderSingle;
exports.default = uploader;
