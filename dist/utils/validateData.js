"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const zod_1 = require("zod");
const validateData = (schema, data) => {
    try {
        schema.parse(data);
        return { success: true };
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errorMessage = error.errors.map((err) => err.message)[0];
            return {
                error: errorMessage !== null && errorMessage !== void 0 ? errorMessage : 'Invalid request data',
            };
        }
        else {
            return { success: false, error: 'Unexpected error during validation' };
        }
    }
};
exports.validateData = validateData;
