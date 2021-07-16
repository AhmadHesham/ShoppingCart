import express from "express";
import Coupon from "../../models/Coupon";

const router = express.Router();

router.post("/check", async (req, res) => {
  const { code } = req.body;
  await Coupon.findById(code).then((queryRes) => {
    if (queryRes) {
      res.send({ msg: "Coupon Found!", data: queryRes });
    } else {
      res.send({ msg: "Coupon Not Found!", data: null });
    }
  });
});

router.post("/addCoupon", async (req, res) => {
  const { code, value, flatValue } = req.body;
  const coupon = new Coupon({
    _id: code,
    value: value,
    flatValue: flatValue,
  });
  await Coupon.create(coupon).then((_) =>
    res.send({ msg: "Coupon Created Successfully!" })
  );
});

router.get("/redeem", async (req, res) => {
  await Coupon.find().then((queryRes: Array<any>) => {
	  let index = Math.floor(Math.random() * queryRes.length)
	  res.send({msg: "Coupon Redeemed!", data: queryRes[index]}); 
  });
});

export default router;
