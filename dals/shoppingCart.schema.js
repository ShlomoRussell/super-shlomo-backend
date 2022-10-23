import mongoose from "mongoose";
import { getPrice, setPrice } from "./priceHelpers.js";

const { Schema, model } = mongoose;

const cartItemsSchema = new Schema({
  itemId: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, get: getPrice, set: setPrice, required: true },
});

const shoppingCartSchema = new Schema({
  customerId: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  items: [cartItemsSchema],
});

const ShoppingCartModel = model("cart", shoppingCartSchema);

export async function deleteCart(customerId, dateCreated) {
  return ShoppingCartModel.deleteOne({ customerId, dateCreated });
}

export async function findLatestCart(customerId) {
  return ShoppingCartModel.find({ customerId })
    .limit(1)
    .sort({ dateCreated: -1 });
}

export async function createCart(newCart) {
  return ShoppingCartModel.insertMany(newCart);
}

const checkIfItemExists = async (cartId, itemId) => {
  const items = await ShoppingCartModel.find({ _id: cartId }).select({
    items: 1,
    _id: 0,
  });
  if (items.length > 0) {
    return items[0].items.find((item) => item.itemId === itemId);
  }
  return null;
};

const updateOneItemQuantity = async (cartId, newItem) =>
  ShoppingCartModel.updateOne(
    {
      _id: cartId,
      "items.itemId": newItem.itemId,
    },
    {
      $inc: {
        "items.$.quantity": newItem.quantity,
        "items.$.totalPrice": newItem.totalPrice,
      },
    }
  );

export async function insertToCart(newItem, cartId) {
  const itemExists = await checkIfItemExists(cartId, newItem.itemId);
  if (itemExists) {
    return updateOneItemQuantity(cartId, newItem);
  }
  return ShoppingCartModel.updateOne(
    { _id: cartId },
    { $push: { items: newItem } }
  );
}

export async function deleteOneItem(itemId, cartId) {
  const { quantity, totalPrice } = await checkIfItemExists(cartId, itemId);

  if (quantity > 1) {
    return updateOneItemQuantity(cartId, {
      quantity: -1,
      totalPrice: -(totalPrice / quantity),
      itemId,
    });
  }
  return deleteAllOfOneItemType(itemId, cartId);
}

export async function deleteAllOfOneItemType(itemId, cartId) {
  return ShoppingCartModel.updateOne(
    { _id:cartId },
    {
      $pull: {
        items: { itemId },
      },
    }
  );
}
