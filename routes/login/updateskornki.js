import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatenki", async (req, res) => {
    try {
        const nippos = req.body.nippos;
        const nki_score = req.body.nki_score;
        const year   = req.body.year;

        const updatePromises = await prisma.skor_Performance.updateMany({
                where: {
                    nippos: nippos
                },
                data: {
                    skor: parseFloat(nki_score),
                    tahun: parseInt(year)
                }
            });

        res.status(200).json({ message: "Success", updatePromises });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;