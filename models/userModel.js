import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: [4, "Username must be at least 4 characters"],
    maxlength: [25, "Username must be at most 25 characters"],
  },

  email: {
    type: String,
    required: true,
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

const userModel = mongoose.model("User", userSchema);

export { userModel };
