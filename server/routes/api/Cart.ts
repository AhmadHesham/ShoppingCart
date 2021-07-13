import express from "express"
import Cart from "../../models/Cart";
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.post("/addItemToCart", async (req, res) => {
	const { cartID, item } = req.body;
	const oldCart = Cart.findById(cartID);
	oldCart.items.push(item);
	Cart.findOneAndUpdate(cartID, oldCart, {});

	res.send({ msg: "Item Added Successfully!", code: 200 });
});

router.get("/", async (_, res) => {
	//const {cartID} = req.body;
	//const cart = Cart.findById(cartID);
	const cart = Cart.find();

	res.send({ msg: "Cart Found!", data: cart });
});

export default router;
