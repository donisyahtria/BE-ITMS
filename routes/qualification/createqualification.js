import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createqualification", async (req, res) => {
  try {
    const activeStatuses = await prisma.talent_Profile.findMany({
      where: {
        pakta_integritas: true,
        commitmenletter: true,
      },
    });

    const tipeKomite = await prisma.event_Talent.findFirst({
      where: {
        id: activeStatuses.eventtalentid,
      },
    });

    const idkriteria = await prisma.parameter_Talent_Qualification.findMany({
      where: {
        id_komite_talent: tipeKomite.tipe_komite_talent,
      },
    });

    let profilecreate = activeStatuses.map((status) => ({
      data: idkriteria.map((kriteria) => ({
        nippos: status.nippos,
        eventtalentid: status.eventtalentid,
        id_kriteria_penilaian: kriteria.id_kriteria_penilaian,
        skor: 0,
        berlaku_mulai: null,
        berlaku_hingga: null,
        createdAt: new Date(),
      })),
    }));

    profilecreate = profilecreate.flatMap((item) =>
      item.data.map((data) => data)
    );

    const createdProfiles = await prisma.talent_Qualification.createMany({
      data: profilecreate,
    });

    res.status(200).json({ createdProfiles });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
});

export default router;
