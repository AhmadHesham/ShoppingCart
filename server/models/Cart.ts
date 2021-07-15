import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CartSchema = new Schema({
	itemID: {
		type: String,
		required: true
	}
});

export default mongoose.model('cart', CartSchema);
