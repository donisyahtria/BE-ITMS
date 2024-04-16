import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/getfilterkaryawan", async (req, res) => {
  const kode_rumpun_jabatan = parseInt(req.query.kode_rumpun_jabatan);
  const job_level = req.query.job_level;
  const eventid = req.body.eventtalentid;
  const jobLebel = job_level.split(",");
  try {
    const hasilFilterEvent = await prisma.karyawan.findMany({
      where: {
        rumpun: {
          rumpunevent: {
            some: {
              kode_rumpun_jabatan: kode_rumpun_jabatan,
            },
          },
        },
        job_level: {
          in: jobLebel,
        },
        status_hukdis: "0",
      },
      select: {
        id: true,
        nama: true,
        nippos: true,
      },
    });

    const masukKandidat = await Promise.all(
      hasilFilterEvent.map(async (filter) => {
        await prisma.kandidat_Talent_dan_Source.create({
          data: {
            relasiNippos: {connect:{nippos: filter.nippos,}},
            idevent: {connect:{id: eventid}},
            status_talensource: false,
            createdAt: new Date(),
            // relasiKomiteUnit: {connect:{nippos: null}},
          },
        });
      })
    );

    res.status(200).json({hasilFilterEvent,masukKandidat});
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;