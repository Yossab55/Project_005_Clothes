import mongoose from "mongoose";
import { env } from "./helpers.js";

async function connectToDB(app) {
  try {
    await mongoose.connect(env("DB_CONNECTION"));
    app.listen(env("PORT"), () => {
      console.log(`server is listen on port: ${env("PORT")}`);
    });
  } catch (dataBaseError) {
    console.log(dataBaseError);
  }
}

export { connectToDB };
