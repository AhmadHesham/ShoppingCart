import express from "express";
import Cart from "../../models/Cart";
import Item from "../../models/Item";
import cors from "cors";

const router = express.Router();
router.use(cors());

router.get("/", async (_, res) => {
  const cart = await Cart.find({});
  const result = Array<any>();
  for (let i = 0; i < cart.length; i++) {
    const itemID: string = cart[i].itemID;
    await Item.findById(itemID).then((queryRes) => result.push(queryRes));
  }
  res.send({ msg: "Cart Found!", data: result });
});

router.post("/addItemToCart", async (req, res) => {
  const { itemID } = req.body;
  const newItem = {
    itemID,
  };
  Cart.create(newItem)
    .then((_) => res.send({ msg: "Item Added Successfully!", code: 200 }))
    .catch((err) => res.send({ msg: "Error!", code: 500 }));
});

router.post("/removeItemFromCart", async (req, res) => {
  const { itemID } = req.body;
  await Cart.findOneAndDelete({ itemID });
  res.send({ msg: "Item Removed Successfully!", code: 200 });
});
export default router;
