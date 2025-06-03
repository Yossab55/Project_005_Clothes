import mongoose, { Schema } from "mongoose";
import { deleteFileBy } from "../utils/fileHandle.js";

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

itemSchema.post("deleteMany", function deleteAllImages(docs, next) {
  for (const doc of docs) {
    const fullImageUrl = doc.fullImageUrl;
    if (fullImageUrl) {
      deleteFileBy(fullImageUrl);
    }
  }
  next();
});
//* virtual add to the doc new field without restore it in the db
itemSchema.virtual("fullImageUrl").get(function getUrl() {
  return this.imageSource ? `images/${this.imageSource}` : null;
});
//* make sure that virtuals appears in the json or object of the doc
itemSchema.set("toJSON", { virtuals: true });
itemSchema.set("toObject", { virtuals: true });
const itemModel = new mongoose.model("Item", itemSchema);

export { itemModel };
