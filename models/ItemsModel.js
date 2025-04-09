import mongoose, { Schema } from "mongoose";

const ItemsSchema = new Schema({
  timeUsed: {
    type: Number,
    required: true,
  },
  itemName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: "NoCategory"
  },
  imageSource: {
    type: String
  }
})

const ItemsModel = new mongoose.model("item", ItemsSchema);

export {ItemsModel};