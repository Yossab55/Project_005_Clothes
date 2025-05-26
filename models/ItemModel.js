import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  timeUsed: {
    type: Number,
    required: true,
    default: 0,
  },
  itemName: {
    type: String,
    required: [true, "clothe should have name"],
  },
  category: {
    type: String,
    required: true,
    default: "NoCategory",
  },
  imageSource: {
    type: String,
  },
});

const itemModel = new mongoose.model("Item", itemSchema);

export { itemModel };
