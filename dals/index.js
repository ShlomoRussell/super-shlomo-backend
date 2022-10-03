import {connect} from "mongoose";
import { config } from "dotenv";
config()
export async function connectMongo() {
   try {
      await connect(process.env.DB_URL);

   } catch (error) {
      throw new Error(error.message)
   }
}


