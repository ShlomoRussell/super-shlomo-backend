import { findAllItems, findOneItem, insertItem } from "../dals/items.schema.js";
import ItemsModel from "../models/items.model.js";

export async function getAllItems() {
  try {
    const items = await findAllItems();
    return items.map((item) => new ItemsModel(item));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addItem(newUser) {
  try {
    const item = await insertItem(newUser);
    return new ItemsModel(item[0]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getItem(itemName) {
  try {
    const item = await findOneItem(itemName);
    return new ItemsModel(item);
  } catch (error) {
    throw new Error(error.message);
  }
}
