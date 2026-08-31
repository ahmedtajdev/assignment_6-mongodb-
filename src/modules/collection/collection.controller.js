import { Router } from "express";
import {
  createAuthorsCollection,
  createBooksCollection,
  createBooksTitleIndex,
  createLogsCollection,
} from "./collection.service.js";
import { successResponse } from "../../common/utils/index.js";

const router = Router();

router.post("/books", async (req, res, next) => {
  await createBooksCollection();
  successResponse({
    res,
    status: 201,
    message: "Books collection created successfully",
  });
});

router.post("/books/index", async (req, res, next) => {
  const index = await createBooksTitleIndex();
  successResponse({
    res,
    status: 201,
    message: "Index created successfully",
    index,
  });
});

router.post("/authors", async (req, res, next) => {
  await createAuthorsCollection();
  successResponse({
    res,
    status: 201,
    message: "Author inserted and authors collection created",
  });
});

router.post("/logs/capped", async (req, res, next) => {
  await createLogsCollection();
  successResponse({
    res,
    status: 201,
    message: "Logs collection created successfully",
  });
});

export default router;
