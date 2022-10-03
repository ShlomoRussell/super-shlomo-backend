import mongoose from "mongoose";
import { config } from "dotenv";
config()
export async function connectMongo() {
   mongoose.connect(process.env.DB_URL);
}


