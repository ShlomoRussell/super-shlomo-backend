export default class ItemsModel {
  /**
   * @param {object} item
   * @param {string} item._id
   * @param {string} item.productName
   * @param {number} item.price
   * @param {string} item.picture
   * @param { string} item.category
   */
  constructor({ _id, productName, price, picture, category }) {
    this.id = _id;
    this.productName = productName;
    this.price = price;
    this.picture = picture;
    this.category = category;
  }
}
