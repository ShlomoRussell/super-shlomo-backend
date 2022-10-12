import {
  findAllItems,
  findOneItem,
  insertItem,
  updateItem,
} from "../dals/items.schema.js";
import ItemsModel from "../models/items.model.js";

export async function getAllItems() {
  try {
    const items = await findAllItems();
    return items.map((item) => new ItemsModel(item));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addItem(newItem) {
  try {
    const item = await insertItem(newItem);
    return new ItemsModel(item[0]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editItem(updatedItem) {
  try {
    const updated = await updateItem(updatedItem);
    if (updated.modifiedCount > 0) {
      const item = await findOneItem(updatedItem.id);
      return new ItemsModel(item[0]);
    }
    throw new Error("Item not updated");
  } catch (error) {
    throw new Error(error.message);
  }
}


