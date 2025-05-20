import "dotenv/config.js";
import express from "express";
import { connectToDB } from "./source/db.js";
import { RESPONSE_CODE_GOOD } from "./source/constant/responseCode.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

connectToDB(app);

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "ejs");

// Router

app.get("/", (req, res) => {
  res.status(RESPONSE_CODE_GOOD).json({ hello: "word" });
});

//Error handel

app.use(errorHandler);
