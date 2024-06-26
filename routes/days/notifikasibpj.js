import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/notifbpj", async (req, res) => {
  try {
    const eventid = parseInt(req.body.eventtalentid);
    
    console.log("Received eventid:", eventid);
    console.log("Request body:", req.body);

    const detail = await prisma.daftar_bpj_event.findMany({
      select: {
        eventtalentid: true,
        nippos: true
      },
      where: {
        eventtalentid: eventid,
      },
      distinct: ['nippos']
    });

    console.log("Detail records found:", detail);

    const updatebpjdetail = await prisma.event_Talent.updateMany({
      where: {
        id: eventid
      },
      data: {
        jenis_bpj: req.body.jenis_bpj,
        tanggal_bpj: req.body.tanggal_bpj,
        lokasi_bpj: req.body.lokasi_bpj
      }
    });

    console.log("Update result:", updatebpjdetail);

    for (const row of detail) {
      const eventId = row.eventtalentid;
      const existingRow = await prisma.notifikasi_karyawan.findFirst({
        where: {
          eventtalentid: eventId,
          nippos: row.nippos,
          id_referensi_notifikasi: 7
        }
      });

      if (!existingRow) {
        const masukNotifikasi = await prisma.notifikasi_karyawan.create({
          data: {
            eventtalentid: row.eventtalentid,
            nippos: row.nippos,
            id_referensi_notifikasi: 7,
            dibuat_pada: new Date(),
            read_status: false
          }
        });
        console.log("Notification created:", masukNotifikasi);
      }
    }

    res.status(200).json({ message: "done" });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
