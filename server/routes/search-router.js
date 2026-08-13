import express from "express";
import pool from "../database.js";

const router = express.Router();

// Search for books and authors.
router.get("/", async (req, res) => {
    try {
        const { q } = req.query;

        // Return no results if there is no search query.
        if (!q) {
            return res.json([]);
        }

        // Find books that match the search.
        const bookResults = await pool.query(
            `
            SELECT id, title, author, 'book' AS type
            FROM books
            WHERE title ILIKE $1
            OR author ILIKE $1
            LIMIT 3
            `,
            [`%${q}%`]
        );

        // Find authors that match the search.
        const authorResults = await pool.query(
            `
            SELECT 
                MIN(id) AS id,
                author AS title,
                author,
                'author' AS type
            FROM books
            WHERE author ILIKE $1
            GROUP BY author
            LIMIT 3
            `,
            [`%${q}%`]
        );

        // Combine the results and only return the first three.
        res.json([
            ...authorResults.rows,
            ...bookResults.rows
        ].slice(0, 3));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;