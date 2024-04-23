import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getallkts", async (req, res) => {
  try {
    const detail = await prisma.kandidat_Talent_dan_Source.findMany({
      select: {
        id: true,
        nippos: true,
      },
    });
    res.status(200).json({ detail });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
