import mongoose from "mongoose";
class MongoGrammar {
  static updateGrammar(model, data = {}, id) {
    const filter = { _id: new mongoose.Types.ObjectId(id) };
    let updateFiled = {};
    Object.entries(data).forEach(([felid, value]) => {
      updateFiled[felid] = value || model.felid;
    });
    const update = { $set: updateFiled };
    return { filter, update };
  }
}

export { MongoGrammar };
