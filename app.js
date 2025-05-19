import "dotenv/config.js";
import express from "express";
import { connectToDB } from "./source/db.js";

const app = express();

connectToDB(app);

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "ejs");
