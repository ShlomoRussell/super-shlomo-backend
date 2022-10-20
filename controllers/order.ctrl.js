import { Router } from "express";
import { addOrder, getLatestOrder } from "../bls/order.bl.js";
import { getCount } from "../dals/order.schema.js";

const orderRouter = Router();

orderRouter.post("/", async (req, res) => {
  try {
    const order = await addOrder(req.body);
    return res.send(order);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

orderRouter.get("/count", async (req, res) => {
  try {
    const count = await getCount();
    return res.send(count.toString());
  } catch (error) {
    res.sendStatus(500);
  }
});

orderRouter.get("/lastPurchase", async (req, res) => {
  try {
    const lastPurchase = await getLatestOrder(req.headers.id);
    return res.send(lastPurchase);
  } catch (error) {
    return res.sendStatus(500);
  }
});
export default orderRouter;
