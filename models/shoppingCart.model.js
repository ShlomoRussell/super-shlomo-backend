export class ShoppingCartItems {
  /**
   * @param {object} item
   * @param {string} item.itemId
   * @param {number} item.quantity
   * @param {number} item.totalPrice
   */
  constructor({ itemId, quantity, totalPrice }) {
    this.itemId = itemId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}

export class ShoppingCartModel {
  /**
   * @param {object} cart
   * @param {string} cart._id
   * @param {string} cart.customerId
   * @param {Date} cart.dateCreated
   * @param {ShoppingCartItems[]} cart.items
   */
  constructor({ customerId, dateCreated, items, _id }) {
    this.id = _id;
    this.customerId = customerId;
    this.dateCreated = dateCreated;
    this.items = items.map((item) => new ShoppingCartItems(item));
  }
}
