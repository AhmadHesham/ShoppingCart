"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Cart_1 = __importDefault(require("./routes/api/Cart"));
const Item_1 = __importDefault(require("./routes/api/Item"));
const Coupon_1 = __importDefault(require("./routes/api/Coupon"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
mongoose_1.default
    .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((_) => console.log("Connected to the database!"))
    .catch((err) => console.log(err));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/api/item", Item_1.default);
app.use("/api/cart", Cart_1.default);
app.use("/api/coupon", Coupon_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is up and running on port: ${port}`));
