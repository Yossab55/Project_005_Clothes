import mongoose from "mongoose";

function getObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}

export { getObjectId };
