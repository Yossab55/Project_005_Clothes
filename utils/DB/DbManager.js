import { MongoGrammar } from "./MongoGrammar.js";

class DbManager {
  static async update(model, data, id) {
    const { filter, update } = MongoGrammar.updateGrammar(model, data, id);

    return await model.updateOne(filter, update, {
      runValidators: true,
    });
  }
}

export { DbManager };
