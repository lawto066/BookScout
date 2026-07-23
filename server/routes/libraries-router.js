import express from "express";
import pool from "../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM libraries");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

router.post("/", async (req, res) => {
    console.log(req.body)
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