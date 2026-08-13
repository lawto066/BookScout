import express from "express";
import cors from "cors";

import libraryRoutes from "./routes/libraries-router.js";
import bookRoutes from "./routes/books-router.js";
import locationRoutes from "./routes/location-router.js";
import searchRoutes from "./routes/search-router.js";

const app = express();

// Allow the frontend to communicate with the server.
app.use(cors());

// Allow the server to receive JSON data.
app.use(express.json());

// API routes.
app.use("/api/libraries", libraryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/search", searchRoutes);

// Serve the React frontend.
app.use(express.static("../dist"));

// Send the React app for other pages.
app.get("/{*splat}", (req, res) => {
    res.sendFile("index.html", { root: "../dist" });
});

// Start the server.
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});