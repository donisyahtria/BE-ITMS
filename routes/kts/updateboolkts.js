import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatebool", async (req, res) => {
  try {
    const masukKomite = await prisma.kandidat_Talent_dan_Source.update({
      where: {
        id: req.body.id,
      },
      data: {
        status_talensource: req.body.status_talensource,
      },
    });

    res.status(200).json({ masukKomite }); // Sending both variables in response
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;