import express from "express";
//import mongoose from 'mongoose';
import Item from "../../models/Item";

const router = express.Router();

router.get("/", async (_, res) => {
	const items = await Item.find();
	res.send({ msg: "Items Found Successfully", data: items });
});

router.post("/addItem", async (req, res) => {
	console.log(req.body);
	const { itemName, itemPrice } = req.body;
	const newItem = {
		name: itemName,
		price: itemPrice,
	};

	await Item.create(newItem);
	res.send({ msg: "Item Created Successfully!" });
});

export default router;
