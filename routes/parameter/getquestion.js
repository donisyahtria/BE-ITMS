import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getquestion", async (req, res) => {
    try {
        const getQuestions = await prisma.referensi_Pertanyaan.findMany({
            select: {
                id: true,
                pertanyaan: true
            }
        });

        // Manipulating the data before sending the response
        const modifiedQuestions = getQuestions.map(question => ({
            id: question.id,
            text: question.pertanyaan // Rename 'pertanyaan' to 'text'
        }));
        res.status(200).json({ message: "True", data:modifiedQuestions});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
