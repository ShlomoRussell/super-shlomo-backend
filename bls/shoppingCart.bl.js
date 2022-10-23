import {
  createCart,
  deleteCart,
  findLatestCart,
  insertToCart,
} from "../dals/shoppingCart.schema.js";
import {
  ShoppingCartItems,
  ShoppingCartModel,
} from "../models/shoppingCart.model.js";

export async function getCart(customerId) {
  try {
    const cart = await findLatestCart(customerId);
console.log(cart)
    // if there no existing cart create new one
    if (cart.length === 0) {
      return createNewCart(customerId);
    }

    // if the cart that was open from the last time the customer visited the site 
    // has nothing in it then delete the old cart and return a new cart
    if (!cart[0].items.length) {
      console.log('yes')
      await deleteCart(customerId, cart[0].dateCreated);
      return createNewCart(customerId);
    }
  
    // return a cart that was open from a previous visit 
    return new ShoppingCartModel(cart[0]);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function createNewCart(customerId) {
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

export async function addtoCart(newItem, cartId) {
  try {
    const item = await insertToCart(newItem, cartId);
    return new ShoppingCartItems(newItem);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
