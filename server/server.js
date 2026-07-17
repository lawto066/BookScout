/* eslint-disable no-undef */

import express from "express";
import cors from "cors";

import libraryRoutes from "./routes/libraries-router.js";
import bookRoutes from "./routes/books-router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/libraries", libraryRoutes);
app.use("/api/books", bookRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});