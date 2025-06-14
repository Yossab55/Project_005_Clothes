import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectToDB } from "./utils/DB/db.js";
import { RESPONSE_CODE_GOOD } from "./utils/constant/responseCode.js";
import { errorHandler } from "./middleware/errorHandler.js";
import {
  signupRouter,
  loginRouter,
  userRouter,
  itemRouter,
  imageRouter,
} from "./routers/indexRouter.js";
const app = express();

connectToDB(app);

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("./public"));
app.set("view engine", "ejs");

// Router

app.get("/", (req, res) => {
  res.status(RESPONSE_CODE_GOOD).json({ hello: "word" });
});
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/items", itemRouter);
app.use("/image", imageRouter);

// Error handel
app.use(errorHandler);
