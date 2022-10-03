export default class OrderModel {
  /**
   * @param {object} order
   * @param {string} order.customerId
   * @param {string} order.cartId
   * @param {number} order.totalPrice
   * @param {string} order.city
   * @param {string} order.street
   * @param {Date} order.deliveryDate
   * @param {Date} order.orderedDate
   * @param {number} order.lastFourDigitsOfCC
   */
  constructor({
    customerId,
    cartId,
    city,
    deliveryDate,
    lastFourDigitsOfCC,
    orderedDate,
    street,
    totalPrice,
  }) {
    this.customerId = customerId;
    this.cartId = cartId;
    this.totalPrice = totalPrice;
    this.city = city;
    this.street = street;
    this.deliveryDate = deliveryDate;
    this.orderedDate = orderedDate;
    this.lastFourDigitsOfCC = lastFourDigitsOfCC;
  }
}
