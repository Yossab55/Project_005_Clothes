import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";
import { AppError } from "../utils/errors/AppError.js";
import { itemModel } from "./itemModel.js";
import { RESPONSE_CODE_BAD } from "../utils/constant/responseCode.js";
import {
  ERROR_CODE_EMAIL_NOT_FOUND,
  ERROR_CODE_WRONG_PASSWORD,
} from "../utils/constant/errorCode.js";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: [4, "Username must be at least 4 characters"],
    maxlength: [25, "Username must be at most 25 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [isEmail, "Email should be a valid email"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [30, "Password must be at most 30 characters"],
  },
});

userSchema.pre("save", async function hashPassword(next) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("remove", function removeReferences(next) {
  const id = this["_id"];
  itemModel.removeFromParent(id);
  next();
});

userSchema.statics.login = async function (userData) {
  const { email, password } = userData;
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw new AppError(
        ERROR_CODE_WRONG_PASSWORD,
        "wrong password",
        RESPONSE_CODE_BAD
      );
    }
  } else {
    throw new AppError(
      ERROR_CODE_EMAIL_NOT_FOUND,
      "the user doesn't exists",
      RESPONSE_CODE_BAD
    );
  }
};

const userModel = mongoose.model("User", userSchema);

export { userModel };
