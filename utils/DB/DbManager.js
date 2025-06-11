import { MongoGrammar } from "./MongoGrammar.js";

class DbManager {
  static async update(model, oldData, data, id) {
    const { filter, update } = MongoGrammar.updateGrammar(oldData, data, id);
    return await model.updateOne(filter, update, {
      runValidators: true,
    });
  }
}

export { DbManager };
