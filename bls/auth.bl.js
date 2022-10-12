import { findUser, insertUser } from "../dals/users.schema.js";
import UserModel from "../models/user.model.js";

export async function getUserByUsernameOrEmail(username) {
  try {
    const user = await findUser({ username });
    if (user[0]) {
      console.log(user[0]);
      return new UserModel(user[0]);
    }
    throw new Error("username not found!");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addUser(newUser) {
  try {
    const user = await insertUser(newUser);
    return new UserModel(user[0]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserById(id) {
  try {
    const user = await findUser({ _id: id });
    return new UserModel(user[0]);
  } catch (error) {
    throw new Error(error.message);
  }
}
