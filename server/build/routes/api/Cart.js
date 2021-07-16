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
const Item_1 = __importDefault(require("../../models/Item"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
router.use(cors_1.default());
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.find({});
    const result = Array();
    for (let i = 0; i < cart.length; i++) {
        const itemID = cart[i].itemID;
        yield Item_1.default.findById(itemID).then((queryRes) => result.push(queryRes));
    }
    res.send({ msg: "Cart Found!", data: result });
}));
router.post("/addItemToCart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemID } = req.body;
    const newItem = {
        itemID,
    };
    Cart_1.default.create(newItem)
        .then((_) => res.send({ msg: "Item Added Successfully!", code: 200 }))
        .catch((err) => res.send({ msg: "Error!", code: 500 }));
}));
router.post("/removeItemFromCart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemID } = req.body;
    yield Cart_1.default.findOneAndDelete({ itemID });
    res.send({ msg: "Item Removed Successfully!", code: 200 });
}));
exports.default = router;
