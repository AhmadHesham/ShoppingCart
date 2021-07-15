"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CouponSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    flatValue: {
        type: Boolean,
        required: true
    }
});
exports.default = mongoose_1.default.model("coupon", CouponSchema);
