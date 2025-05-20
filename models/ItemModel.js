import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
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

// todo static method to save file in the folder file
const ItemModel = new mongoose.model("item", ItemSchema);

export { ItemModel };
