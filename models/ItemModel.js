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
  favorite: {
    type: Boolean,
    default: false,
  },
  imageSource: {
    type: String,
  },
});

itemSchema.post("deleteMany", function deleteAllImages(docs, next) {
  for (const doc of docs) {
    const fullImageUrl = doc.fullImageUrl;
    console.log(fullImageUrl);
    if (fullImageUrl) {
      tryCatch(deleteFileBy(fullImageUrl));
    }
  }
  next();
});
//* virtual add to the doc new field without restore it in the db
//! I felt like it do nothing actually so i remove it but let it here to just
//know about mongoose virtual
// itemSchema.virtual("fullImageUrl").get(function getUrl() {
//   return this.imageSource ? `images/${this.imageSource}` : null;
// });
//* make sure that virtuals appears in the json or object of the doc
itemSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.id;
    return ret;
  },
});
itemSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.id;
    return ret;
  },
});
const itemModel = new mongoose.model("Item", itemSchema);

export { itemModel };
