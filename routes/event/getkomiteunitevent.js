import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkomiteunitevent", async (req, res) => {
  try {
    const nippos = req.query.nippos;
    console.log(nippos);
    const eventperkomite = await prisma.notifikasi_karyawan.findMany({
      select: {
        eventtalentid: true
      },
      where: {
        nippos: nippos,
        id_referensi_notifikasi: 2
      }
    });

    const eventIds = eventperkomite.map(event => event.eventtalentid);

    const events = await prisma.event_Talent.findMany({
      where: {
        id: {
          in: eventIds
        }
      },
      select: {
        id: true,
        nama_event: true,
        deskripsi: true,
        tipekomite: {
          select: {
            tipe_komite_talent: true
          }
        },
        kode_rumpun_jabatan: true,
        rumpun: {
          select: {
            nama_rumpun_jabatan: true
          }
        },
        tanggal_mulai: true,
        tanggal_selesai: true,
        evenstatus_id: true,
        kandidat: {
          where: {
            komite_unit: nippos
          },
          select: {
            status_talensource: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const parameter = await prisma.parameter_Kuota.findFirst({
      where:{
        id: 1
      },
      select:{
        bobot: true
      }
    })


    // Process the result to determine the value of some_variable and exclude status_talensource
    const processedEvents = events.map(event => {
      const totalKandidat = event.kandidat.length;
      const trueStatusCount = event.kandidat.filter(k => k.status_talensource === true).length;
      const statusisi = trueStatusCount >= (totalKandidat * (parameter.bobot/100));

      // Exclude status_talensource from the kandidat
      const { kandidat, ...eventWithoutKandidat } = event;

      return {
        ...eventWithoutKandidat,
        statusisi
      };
    });

    res.status(200).json({ event: processedEvents });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
