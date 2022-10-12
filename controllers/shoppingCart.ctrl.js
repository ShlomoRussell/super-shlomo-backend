import { Router } from "express";
import { addtoCart, createNewCart, getCart } from "../bls/shoppingCart.bl.js";
import {
  deleteAllOfOneItemType,
  deleteCart,
  deleteOneItem,
} from "../dals/shoppingCart.schema.js";

const shoppingCartRouter = Router();

shoppingCartRouter.get("/", async (req, res) => {
  try {
    const cart = await getCart(req.headers.id);
    return res.send(cart);
  } catch (error) {
    return res.sendStatus(500);
  }
});

shoppingCartRouter.get("/newCart", async (req, res) => {
  try {
    const cart = await createNewCart(req.headers.id);
    return res.send(cart);
  } catch (error) {
    return res.sendStatus(500);
  }
});

shoppingCartRouter.put("/addToCart", async (req, res) => {
  try {
    const cart = await addtoCart(req.body, req.headers.id);
    return res.send(cart);
  } catch (error) {
    return res.sendStatus(500);
  }
});

shoppingCartRouter.delete("/", async (req, res) => {
  try {
    const deleted = await deleteCart(req.headers.id);
    if (deleted.deletedCount > 0) {
      return res.send(true);
    } else throw new Error();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

shoppingCartRouter.delete("/oneItem", async (req, res) => {
  try {
    const deleted = await deleteOneItem(req.body.itemId, req.headers.id);
    if (deleted.modifiedCount > 0) {
      return res.send(true);
    } else throw new Error();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

shoppingCartRouter.delete("/allOfItemType", async (req, res) => {
  try {
    const deleted = await deleteAllOfOneItemType(
      req.body.itemId,
      req.headers.id
    );
    console.log(deleted);
    if (deleted.modifiedCount > 0) {
      return res.send(true);
    } else throw new Error();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default shoppingCartRouter;
