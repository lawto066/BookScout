import express from "express";
import pool from "../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { genres, query } = req.query;

        let result;

        if (genres || query) {
            result = await pool.query(
                `
                SELECT DISTINCT
                    libraries.*,
                    EXISTS (
                        SELECT 1
                        FROM books
                        WHERE books.library_id = libraries.id
                    ) AS has_books
                FROM libraries
                JOIN books ON books.library_id = libraries.id
                WHERE 
                    ($1::text[] IS NULL OR books.genre = ANY($1))
                    AND
                    ($2::text IS NULL OR books.title ILIKE $2 OR books.author ILIKE $2)
                `,
                [genres ? genres.split(",") : null, query ? `%${query}%` : null]
            );

        } else {
            result = await pool.query(
                `
                SELECT
                    libraries.*,
                    EXISTS (
                        SELECT 1
                        FROM books
                        WHERE books.library_id = libraries.id
                    ) AS has_books
                FROM libraries
                `
            );
        }

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM libraries WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Library not found" });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, location_name, charter_number, latitude, longitude } = req.body;

        const result = await pool.query(
            `INSERT INTO libraries
            (name, location_name, charter_number, latitude, longitude)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, location_name, charter_number, latitude, longitude]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM books WHERE library_id = $1",
            [id]
        );

        await pool.query(
            "DELETE FROM libraries WHERE id = $1",
            [id]
        );

        res.json({ message: "Library deleted" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;