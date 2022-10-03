import {
  createCart,
  deleteCart,
  findCart,
  insertToCart,
} from "../dals/shoppingCart.schema.js";
import {
  ShoppingCartItems,
  ShoppingCartModel,
} from "../models/shoppingCart.model.js";

export async function getCart(customerId) {
  try {
    const cart = await findCart(customerId);

    //if there no existing cart create new one
    if (cart.length === 0) {
      try {
        const newCart = await createCart({
          customerId,
          dateCreated: new Date(),
        });
        return new ShoppingCartModel(newCart[0]);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    return new ShoppingCartModel(cart[0]);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function createNewCart(newCart) {
  try {
    const cart = await createCart(newCart);
    return new ShoppingCartModel(cart[0]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addtoCart(newItem, customerId) {
  try {
    const item = await insertToCart(newItem, customerId);
    return new ShoppingCartItems(newItem);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
