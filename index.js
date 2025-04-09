import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import {env} from "./source/helpers.js";


const app = express();
await mongoose.connect(env("DB_CONNECTION"))
app.listen(env("PORT"))