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
const Cart_1 = __importDefault(require("../../models/Cart"));
const router = express_1.default.Router();
router.post("/addItemToCart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartID, item } = req.body;
    const oldCart = Cart_1.default.findById(cartID);
    oldCart.items.push(item);
    Cart_1.default.findOneAndUpdate(cartID, oldCart, {});
    res.send({ msg: "Item Added Successfully!", code: 200 });
}));
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const {cartID} = req.body;
    //const cart = Cart.findById(cartID);
    const cart = Cart_1.default.find();
    res.send({ msg: "Cart Found!", data: cart });
}));
exports.default = router;
