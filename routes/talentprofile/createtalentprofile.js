import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createtalentprofile", async (req, res) => {
  try {
    const activeStatuses = await prisma.kandidat_Talent_dan_Source.findMany({
      where: {
        status_talensource: true,
      },
    });

    const profilesToCreate = activeStatuses.map(status => ({
      nippos: status.nippos,
      eventtalentid: status.eventtalentid,
      komite_unit: status.komite_unit,
      pakta_integritas: false,
      commitmenletter: false,
      createdAt: new Date()
    }));

    const createdProfiles = await prisma.talent_Profile.createMany({
      data: profilesToCreate,
    });

    res.status(200).json({ createdProfiles });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
});

export default router;
