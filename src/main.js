import express from "express";
import { globalErrorHandling } from "./middleware/index.js";
import { bootstrapDB } from "./DB/connection.db.js";
import { authenticationController } from "./modules/index.js";
import { collectionController } from "./modules/index.js";
import { booksController } from "./modules/index.js";
import { logsController } from "./modules/index.js";

const app = express();

bootstrapDB(app);

app.use(express.json());

app.all("/", (req, res) => res.status(200).json({ message: "Welcome" }));

app.use("/auth", authenticationController);

app.use("/collection", collectionController);

app.use("/books", booksController);

app.use("/logs", logsController);

app.all("{/*dummy}", (req, res) =>
  res.status(404).json({ message: "Invalid application routing" }),
);

app.use(globalErrorHandling);
