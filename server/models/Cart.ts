import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CartSchema = new Schema({
	items: {
		type: Array,
		required: true
	}
});

export default mongoose.model('cart', CartSchema);
