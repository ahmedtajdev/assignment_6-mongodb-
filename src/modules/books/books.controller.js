import { successResponse } from "../../common/utils/index.js";
import {
  addBook,
  addBooksBatch,
  aggregate1,
  aggregate2,
  aggregate3,
  aggregate4,
  deleteBooksBeforeYear,
  excludeGenres,
  findBookByTitle,
  findBooksByGenre,
  findBooksByYear,
  findIntegerYearBooks,
  skipLimitBooks,
  updateFutureBook,
} from "./books.service.js";

import { Router } from "express";

const router = Router();

router.post("", async (req, res, next) => {
  const { acknowledged, insertedId } = await addBook(req.body);
  successResponse({
    res,
    status: 201,
    message: "Book inserted successfully",
    acknowledged,
    insertedId,
  });
});

router.post("/batch", async (req, res, next) => {
  const { acknowledged, insertedIds } = await addBooksBatch(req.body);
  successResponse({
    res,
    status: 201,
    message: "Books inserted successfully",
    acknowledged,
    insertedIds,
  });
});

router.patch("/Future", async (req, res, next) => {
  const { acknowledged, matchedCount, modifiedCount } =
    await updateFutureBook();
  successResponse({
    res,
    message: "Future book updated successfully",
    acknowledged,
    matchedCount,
    modifiedCount,
  });
});

router.get("/title", async (req, res, next) => {
  const book = await findBookByTitle(req.query.title);
  successResponse({
    res,
    book,
  });
});

router.get("/year", async (req, res, next) => {
  const books = await findBooksByYear(
    Number(req.query.from),
    Number(req.query.to),
  );
  successResponse({
    res,
    books,
  });
});

router.get("/genre", async (req, res, next) => {
  const books = await findBooksByGenre(req.query.genre);
  successResponse({
    res,
    books,
  });
});

router.get("/exclude-genres", async (req, res, next) => {
  const books = await excludeGenres();
  successResponse({
    res,
    books,
  });
});

router.get("/skip-limit", async (req, res, next) => {
  const books = await skipLimitBooks();
  successResponse({
    res,
    books,
  });
});

router.get("/year-integer", async (req, res, next) => {
  const books = await findIntegerYearBooks();
  successResponse({
    res,
    books,
  });
});

router.delete("/before-year", async (req, res, next) => {
  const { acknowledged, deletedCount } = await deleteBooksBeforeYear(
    Number(req.query.year),
  );
  successResponse({
    res,
    message: "Books deleted successfully",
    acknowledged,
    deletedCount,
  });
});

router.get("/aggregate1", async (req, res, next) => {
  const books = await aggregate1();
  successResponse({
    res,
    books,
  });
});

router.get("/aggregate2", async (req, res, next) => {
  const books = await aggregate2();
  successResponse({
    res,
    books,
  });
});

router.get("/aggregate3", async (req, res, next) => {
  const books = await aggregate3();
  successResponse({
    res,
    books,
  });
});

router.get("/aggregate4", async (req, res, next) => {
  const books = await aggregate4();
  successResponse({
    res,
    books,
  });
});

export default router;
