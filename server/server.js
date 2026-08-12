import express from "express";
import cors from "cors";

import libraryRoutes from "./routes/libraries-router.js";
import bookRoutes from "./routes/books-router.js";
import locationRoutes from "./routes/location-router.js"
import searchRoutes from "./routes/"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/libraries", libraryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/search", searchRoutes);

app.use(express.static("../dist"));

app.get("/{*splat}", (req, res) => {
    res.sendFile("index.html", { root: "../dist" });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});