import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    const { q } = req.query;

    try {
        const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`,
        {
            headers: {
                "User-Agent": "BookScout/1.0"
            }
        }
    );

    const text = await response.text();

    console.log(text);

    const data = JSON.parse(text);

    res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Location search failed" });
    }
});

export default router;