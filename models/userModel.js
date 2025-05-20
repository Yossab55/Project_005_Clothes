import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";
import { AppError } from "../source/AppError.js";
import { RESPONSE_CODE_BAD } from "../source/constant/responseCode.js";

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
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
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
      throw new AppError(11, "wrong password", RESPONSE_CODE_BAD);
    }
  } else {
    //this user doesn't exists
    throw new AppError(22, "the user doesn't exists", RESPONSE_CODE_BAD);
  }
};
const userModel = mongoose.model("User", userSchema);

export { userModel };
