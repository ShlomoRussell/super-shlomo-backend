import express from "express";
import { config } from "dotenv";
import cors from 'cors'
import jwtMiddleware from "./middlewares/jwtMiddleware.js";
import authRoute from "./controllers/auth.ctrl.js";
import itemsRouter from "./controllers/items.ctrl.js";
import shoppingCartRouter from "./controllers/shoppingCart.ctrl.js";
import { connectMongo } from "./dals/index.js";
import orderRouter from "./controllers/order.ctrl.js";
import { corsOptions } from "./cors/corsOptions.js";

config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "https://super-shlomo-front.onrender.com",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/images", express.static("uploads"));
app.use("/auth", authRoute);
app.use("/api/", jwtMiddleware);
app.use("/api/items", itemsRouter);
app.use("/api/shoppingCart", shoppingCartRouter);
app.use("/api/order", orderRouter);
connectMongo().catch((err) => console.log(err));
app.listen(PORT, () => console.log(`served via port ${PORT}`));
