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
const express_1 = __importDefault(require("express"));
const Coupon_1 = __importDefault(require("../../models/Coupon"));
const router = express_1.default.Router();
router.post("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    yield Coupon_1.default.findById(code).then(queryRes => {
        if (queryRes) {
            res.send({ msg: "Coupon Found!", data: queryRes });
        }
        else {
            res.send({ msg: "Coupon Not Found!", data: null });
        }
    });
}));
router.post("/addCoupon", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, value, flatValue } = req.body;
    const coupon = new Coupon_1.default({
        _id: code,
        value: value,
        flatValue: flatValue
    });
    yield Coupon_1.default.create(coupon).then(_ => res.send({ msg: "Coupon Created Successfully!" }));
}));
exports.default = router;
