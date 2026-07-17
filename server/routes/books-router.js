import express from "express";
import pool from "../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await pool.query(
            `INSERT INTO books 
            (library_id, title, author, publication_year, genre, synopsis, isbn, cover_image)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
            [
                req.body.library_id,
                req.body.title,
                req.body.author,
                req.body.publication_year,
                req.body.genre,
                req.body.synopsis,
                req.body.isbn,
                req.body.cover_image
            ]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await pool.query(
            "DELETE FROM books WHERE id = $1",
            [req.params.id]
        );

        res.json({ message: "Book deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;