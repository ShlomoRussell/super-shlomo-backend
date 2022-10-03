import mongoose from "mongoose";
import { getPrice, setPrice } from "./priceHelpers.js";

const { Schema, model } = mongoose;

const itemsSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, get: getPrice, set: setPrice, required: true },
  picture: { type: String, required: true },
  category: { type: String, required: true },
});

const ItemsModel = model("items", itemsSchema);

export async function findAllItems() {
  return ItemsModel.find({});
}

export async function getCategories() {
  return (await ItemsModel.find({}).select({ category: 1, _id: 0 })).map(
    (c) => c.category
  );
}

export async function insertItem(newItem) {
  return ItemsModel.insertMany(newItem);
}

export async function findOneItem(itemName) {
  return ItemsModel.find({ productName: itemName });
}
