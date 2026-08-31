import { db } from "../../DB/connection.db.js";

export const createBooksCollection = async () => {
  try {
    const existingCollection = await db
      .listCollections({ name: "books" })
      .toArray();

    if (existingCollection.length > 0) {
      throw new Error("Books collection already exists", {
        cause: { status: 409 },
      });
    }

    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "Title must be a non-empty string",
            },
          },
        },
      },
      validationLevel: "strict",
      validationAction: "error",
    });
  } catch (error) {
    throw new Error("Failed to create books collection");
  }
};

export const createBooksTitleIndex = async () => {
  try {
    const result = await db.collection("books").createIndex({ title: 1 });

    return result;
  } catch (error) {
    throw new Error("Failed to create index");
  }
};

export const createAuthorsCollection = async () => {
  try {
    const existingCollection = await db
      .listCollections({ name: "authors" })
      .toArray();

    if (existingCollection.length > 0) {
      throw new Error("Authors collection already exists", {
        cause: { status: 409 },
      });
    }

    await db.collection("authors").insertOne({
      name: "George Orwell",
      nationality: "British",
    });
  } catch (error) {
    throw new Error("Failed to create authors collection");
  }
};

export const createLogsCollection = async () => {
  try {
    const existingCollection = await db
      .listCollections({ name: "logs" })
      .toArray();

    if (existingCollection.length > 0) {
      throw new Error("Logs collection already exists", {
        cause: { status: 409 },
      });
    }

    await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024,
    });
  } catch (error) {
    throw new Error("Failed to create authors collection");
  }
};
