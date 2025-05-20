import "dotenv/config.js";
import express from "express";
import { connectToDB } from "./source/db.js";
import { STATUS_CODE } from "./source/code.js";
const app = express();

connectToDB(app);

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "ejs");

// Router

app.get("/", (req, res) => {
  res.status(STATUS_CODE.GOOD).json({ hello: "word" });
});
