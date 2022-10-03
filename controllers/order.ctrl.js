import { Router } from "express";
import { addOrder } from "../bls/order.bl.js";

const orderRouter = Router();

orderRouter.post("/", async (req, res) => {
  try {
    const order = await addOrder(req.body);
    return res.send(order);
  } catch (error) {
      console.log(error)
    return res.sendStatus(500);
  }
});

export default orderRouter;
