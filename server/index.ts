import express from "express";
import Cart from "./routes/api/Cart";
import Item from "./routes/api/Item";
import mongoose from "mongoose";
import cors from "cors";

require("dotenv").config();
mongoose
	.connect(process.env.mongoURI!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((_) => console.log("Connected to the database!"))
	.catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/item", Item);
app.use("/api/cart", Cart);

const port = process.env.PORT || 3000;
app.listen(port, () =>
	console.log(`Server is up and running on port: ${port}`)
);
