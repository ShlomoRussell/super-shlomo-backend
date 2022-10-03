import { insertOrder } from "../dals/order.schema.js";
import OrderModel from "../models/order.model.js";

export async function addOrder(order) {
  try {
    const newOrder = await insertOrder(order);
    return new OrderModel(newOrder[0]);
  } catch (error) {
    throw new Error(error.message);
  }
}
