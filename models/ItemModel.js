import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  timeUsed: {
    type: Number,
    required: true,
    default: 0,
  },
  itemName: {
    type: String,
    required: true,
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

const ItemModel = new mongoose.model("item", ItemSchema);

export { ItemModel };
