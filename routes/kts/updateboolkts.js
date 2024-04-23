import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatestatussource", async (req, res) => {
  try {
    const masukKomite = await prisma.kandidat_Talent_dan_Source.update({
      where: {
        nippos: req.body.nippos,
      },
      data: {
        status_talensource: req.body.status_talensource,
      },
    });

    res.status(200).json({ masukKomite });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;