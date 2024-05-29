import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getdetailnilai", async (req, res) => {
    const nippos = req.body.nippos
    const eventid = parseInt(req.body.eventtalentid)
  try {
    const detail = await prisma.talent_Days.findMany({
      where: {
        nippos: nippos,
        eventtalentid: eventid
      },
      select: {
        nippos: true,
        id_pertanyaan: true,
        skor: true
      },
    });
    res.status(200).json({ detail });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
