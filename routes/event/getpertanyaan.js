import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getquestion", async (req, res) => {
  const question = req.question;
  try {
    const quest = await prisma.referensi_Pertanyaan.findMany({});
    res.status(200).json({ quest });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
