export default class UserModel {
  /**
   * @param {object} user
   * @param {string} user._id
   * @param {string} user.email
   * @param {string} user.username
   * @param {string} user.password
   * @param {string} user.firstName
   * @param {string} user.lastName
   * @param {string} user.city
   * @param {string} user.street
   * @param {Number} user.teudatZehut
   * @param {'Admin'|'Customer'} user.role
   */

  constructor({
    email,
    username,
    firstName,
    lastName,
    city,
    street,
    teudatZehut,
    password,
    _id,
    role,
  }) {
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = _id;
    this.city = city;
    this.street = street;
    this.teudatZehut = teudatZehut;
    this.password = password;
    this.role = role;
  }
}
