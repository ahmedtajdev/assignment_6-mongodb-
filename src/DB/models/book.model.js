import { db } from "../connection.db.js";

export const bookModel = db.createCollection("books", {
  validator: {
    required: ["title"],
  },
});
