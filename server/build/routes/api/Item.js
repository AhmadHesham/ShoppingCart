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
const Item_1 = __importDefault(require("../../models/Item"));
const router = express_1.default.Router();
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield Item_1.default.find();
    res.send({ msg: "Items Found Successfully", data: items });
}));
router.post("/addItem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { itemName, itemPrice } = req.body;
    const newItem = {
        name: itemName,
        price: itemPrice,
    };
    yield Item_1.default.create(newItem);
    res.send({ msg: "Item Created Successfully!" });
}));
exports.default = router;
