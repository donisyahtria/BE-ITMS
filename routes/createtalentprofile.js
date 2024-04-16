import prisma from "../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/createtalentprofile", async (req, res) => {
  try {
    const talentprofile = await prisma.kandidat_Talent_dan_Source.findMany({
      where: {
        status_talensource: true
      },
    });

    res.status(200).json({ talentprofile });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
