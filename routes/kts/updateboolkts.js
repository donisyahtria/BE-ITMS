import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatestatussource", async (req, res) => {
  try {
    const nippos = req.body.nippos
    const eventid     = Number(req.query.eventtalentid)
    const updates = await Promise.all(nippos.map(async (nipposItem) => {
      const masukKomite = await prisma.kandidat_Talent_dan_Source.updateMany({
        where: {
          nippos: nipposItem,
          eventtalentid: eventid
        },
        data: {
          status_talensource: true,
        },
      });
      return masukKomite;
    }));

    res.status(200).json({ updates });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

export default router;