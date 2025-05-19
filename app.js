import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import { env } from "./source/helpers.js";

const app = express();
mongoose.connect(env("DB_CONNECTION")).then(() => {
  app.listen(env("PORT"), () => {
    console.log(`server is listen on port: ${env("PORT")}`);
  });
});

const db = mongoose.connection;

db.on("err", () => {
  console.log("error with db");
});
db.on("open", () => {
  console.log("db is open");
});
//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "ejs");

import { ItemsRouter } from "./routers/ItemsRouter.js";
app.use("/items", ItemsRouter);

// app.get("/", (request, response) => {
//   response.redirect("/items")
// })
