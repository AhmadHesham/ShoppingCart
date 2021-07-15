import mongoose from "mongoose";

const Schema = mongoose.Schema;


export interface Coupon extends mongoose.Document {
	_id: string,
	value: number,
	flatValue: boolean
}

const CouponSchema = new Schema<Coupon>({
	_id: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		required: true
	},
	flatValue: {
		type: Boolean,
		required: true
	}
});
export default mongoose.model<Coupon>("coupon", CouponSchema);
