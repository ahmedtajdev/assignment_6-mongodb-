import { db } from "../../DB/connection.db.js";

export const addBook = async (bookInfo) => {
  try {
    const book = {
      title: bookInfo.title,
      author: bookInfo.author,
      year: bookInfo.year,
      genres: bookInfo.genres,
    };

    const { acknowledged, insertedId } = await db
      .collection("books")
      .insertOne(book);

    return { acknowledged, insertedId };
  } catch (error) {
    throw new Error("Failed to insert book");
  }
};

export const addBooksBatch = async (books) => {
  try {
    const { acknowledged, insertedIds } = await db
      .collection("books")
      .insertMany(books);

    if (!Array.isArray(books) || books.length < 3) {
      throw new Error("At least three books are required", {
        cause: { status: 400 },
      });
    }

    return { acknowledged, insertedIds };
  } catch (error) {
    throw new Error("Failed to insert books");
  }
};

export const updateFutureBook = async () => {
  try {
    const { acknowledged, matchedCount, modifiedCount } = await db
      .collection("books")
      .updateOne(
        { title: "Future" },
        {
          $set: {
            year: 2022,
          },
        },
      );

    if (matchedCount === 0) {
      throw new Error("Book with title Future not found", {
        cause: { status: 404 },
      });
    }

    return { acknowledged, matchedCount, modifiedCount };
  } catch (error) {
    throw new Error("Failed to update book");
  }
};

export const findBookByTitle = async (title) => {
  try {
    const book = await db.collection("books").findOne({ title });

    if (!book) {
      throw new Error("Book not found", {
        cause: { status: 404 },
      });
    }

    return book;
  } catch (error) {
    throw new Error("Failed to find book");
  }
};

export const findBooksByYear = async (from, to) => {
  try {
    const books = await db
      .collection("books")
      .find({
        year: {
          $gte: from,
          $lte: to,
        },
      })
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Failed to find book");
  }
};

export const deleteBooksBeforeYear = async (year) => {
  try {
    const { acknowledged, deletedCount } = await db
      .collection("books")
      .deleteMany({
        year: {
          $lt: year,
        },
      });
    return { acknowledged, deletedCount };
  } catch (error) {
    throw new Error("Failed to delete books");
  }
};

export const findBooksByGenre = async (genre) => {
  try {
    const books = await db
      .collection("books")
      .find({
        genres: genre,
      })
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Failed to find books");
  }
};

export const excludeGenres = async () => {
  try {
    const books = await db
      .collection("books")
      .find({
        genres: {
          $nin: [/^Horror$/i, /^Science Fiction$/i],
        },
      })
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Failed to retrieve books");
  }
};

export const skipLimitBooks = async () => {
  try {
    const books = await db
      .collection("books")
      .find({})
      .sort({
        year: -1,
      })
      .skip(2)
      .limit(3)
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Failed to retrieve books");
  }
};

export const findIntegerYearBooks = async () => {
  try {
    const books = await db
      .collection("books")
      .find({
        year: {
          $type: "int",
        },
      })
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Failed to retrieve books");
  }
};

export const aggregate1 = async () => {
  try {
    const books = await db
      .collection("books")
      .aggregate([
        {
          $match: {
            year: {
              $gt: 2000,
            },
          },
        },
        {
          $sort: {
            year: -1,
          },
        },
      ])
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Aggregation failed");
  }
};

export const aggregate2 = async () => {
  try {
    const books = await db
      .collection("books")
      .aggregate([
        {
          $match: {
            year: {
              $gt: 2000,
            },
          },
        },
        {
          $project: {
            _id: 0,
            title: 1,
            author: 1,
            year: 1,
          },
        },
      ])
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Aggregation failed");
  }
};

export const aggregate3 = async () => {
  try {
    const books = await db
      .collection("books")
      .aggregate([
        {
          $unwind: "$genres",
        },
      ])
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Aggregation failed");
  }
};

export const aggregate4 = async () => {
  try {
    const books = await db
      .collection("books")
      .aggregate([
        {
          $lookup: {
            from: "logs",
            localField: "_id",
            foreignField: "bookId",
            as: "logs",
          },
        },
      ])
      .toArray();

    return books;
  } catch (error) {
    throw new Error("Aggregation failed");
  }
};
