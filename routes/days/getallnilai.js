import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/getnilaidays", async (req, res) => {
    const nippos = req.body.nippos
    const eventid = parseInt(req.body.eventtalentid)
  try {
    const nilai = await prisma.talent_Days.findMany({
      orderBy: {
        id_pertanyaan: 'asc'
      },
        where:{
            nippos: nippos,
            eventtalentid: eventid,
            // id_pertanyaan: {
            //     in: [1, 2, 3]
            // }
        },
      select: {
        id_pertanyaan: true,
        skor: true
      },
    });
    res.status(200).json({ nilai });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
