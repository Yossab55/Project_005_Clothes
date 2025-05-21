import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import { connectToDB } from "./utils/db.js";
import { RESPONSE_CODE_GOOD } from "./utils/constant/responseCode.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { signupRouter } from "./routers/signupRouter.js";
import { loginRouter } from "./routers/loginRouter.js";
import { userRouter } from "./routers/userRouter.js";

const app = express();

connectToDB(app);

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./public"));
app.set("view engine", "ejs");

// Router

app.get("/", (req, res) => {
  res.status(RESPONSE_CODE_GOOD).json({ hello: "word" });
});
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
//Error handel

app.use(errorHandler);
