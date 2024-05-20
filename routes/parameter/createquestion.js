import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/addquestion", async (req, res) => {
    try {
        const addquestion = await prisma.referensi_Pertanyaan.create({
            data: {
                pertanyaan: req.body.pertanyaan
            }
        });
        res.status(200).json({ message: "True", data:addquestion});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
