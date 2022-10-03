import { Router } from "express";
import { hash as _hash, compare } from "bcrypt";
import { config } from "dotenv";
import { getUserByUsernameOrEmail, addUser, getUserById } from "../bls/auth.bl.js";
import jwt from "jsonwebtoken";
import { checkIfTeudatZehutExistAlready } from "../dals/users.schema.js";
import jwtMiddleware from '../middlewares/jwtMiddleware.js'
const authRoute = Router();
config();
const saltRounds = 10;

authRoute.get("/checkToken", jwtMiddleware, async (req, res) => {
  const id = req.headers.id;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const user = await getUserById(id);
    console.log(user);
    delete user.password;
    return res.send({ ...user, token });
  } catch (error) {
    return res.sendStatus(500);
  }
});

authRoute.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await getUserByUsernameOrEmail(username, email);
    if (user === undefined)
      throw new Error(`${username ? "username" : "email"} not found!`);

    const result = await compare(password, user.password);
    console.log(user);
    if (!result) return res.status(404).send("Incorrect password!");

    const token = jwt.sign(
      { username: req.body.username, id: user.id },
      process.env.SECRET_KEY
    );
    delete user.password;
    res.status(201).json({ ...user, token });
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});



authRoute.post("/register", async (req, res) => {
  const hash = await _hash(req.body.password, saltRounds);
  try {
    const newUser = await addUser({
      ...req.body,
      password: hash,
    });

    if (newUser) {
      const token = jwt.sign(
        { username: newUser.username, id: newUser.id },
        process.env.SECRET_KEY
      );
      delete newUser.password;
      res.status(201).json({ token, ...newUser });
    }
  } catch (error) {
    if (error.message.split(" ")[1] === "Duplicate") {
      return res
        .status(409)
        .send("Username already exist! Please try a different one!");
    }
    console.log(error.message);
    return res.sendStatus(500);
  }
});


authRoute.post("/checkForTeudatZehut", async (req, res) => {
  try {
    const userExists = await checkIfTeudatZehutExistAlready(
      req.body.teudatZehut
    );
    if (userExists.length === 0) return res.send(true);
    return res.status(409).send("Teudat Zehut Already Exists!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default authRoute;
