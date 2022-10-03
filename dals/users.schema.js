import mongoose from "mongoose";

const { Schema, model } = mongoose;

function isCustomer() {
  if (this.role === "Customer") {
    return true;
  }
  return false;
}
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is a Required Field!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is a Required field!"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is a Required Field!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is a Required Field!"],
  },
  teudatZehut: {
    type: Number,
    required: [true, "Teudat Zehut is a Required field!"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is a Required Field!"] },
  city: { type: String, required: [isCustomer, "City is a Required Field!"] },
  street: {
    type: String,
    required: [isCustomer, "Street is a Required Field!"],
  },
  role: {
    type: String,
    enum: ["Admin", "Customer"],
    default: "Customer",
    required: true,
  },
});

export const UserModel = model("users", userSchema);

export async function findUser(query) {
  return UserModel.find(query);
}

export async function insertUser(newUser) {
  return UserModel.insertMany(newUser);
}

export async function checkIfTeudatZehutExistAlready(teudatZehut) {
  return UserModel.find({teudatZehut:teudatZehut})
}