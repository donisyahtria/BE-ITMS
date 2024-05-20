import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatequestion", async (req, res) => {
    const updates = req.body.updates;

    if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({ message: "Invalid input format. Expected an array of updates." });
    }

    console.log("ini update", updates);

    try {
        const updatePromises = updates.map(update => 
            prisma.referensi_Pertanyaan.update({
                where: {
                    id: update.id
                },
                data: {
                    pertanyaan: update.pertanyaan
                }
            })
        );

        const updateResults = await Promise.all(updatePromises);
        res.status(200).json({ message: "True", data: updateResults });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
