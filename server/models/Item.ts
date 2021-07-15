import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface Item extends mongoose.Document {
  name: string;
  price: string;
}

const ItemSchema = new Schema<Item>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Item>("item", ItemSchema);
