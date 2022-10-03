import mongoose from "mongoose";
import { config } from "dotenv";
config()
export async function connectMongo() {
   try {
      await mongoose.connect(process.env.DB_URL);

   } catch (error) {
      throw new Error(error.message)
   }
}


