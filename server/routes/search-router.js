import express from "express";
import pool from "../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.json([]);
        }

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