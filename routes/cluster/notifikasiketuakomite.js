import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/notifketuakomite", async (req, res) => {
  try {    
    const eventid = parseInt(req.body.eventtalentid)
    const detail = await prisma.event_Talent.findMany({
        select:{
            id:true,
            nippos_ketua_komite:true
        },
        where:{
            id: eventid
        }
    })

    for (const row of detail) {
      const eventId = row.eventtalentid;
      // Check if the event_id exists in the insertedEventIds table
      const existingRow = await prisma.notifikasi_karyawan.findFirst({
        where: {
          eventtalentid: eventId,
          id_referensi_notifikasi: 5,
          nippos: row.nippos_ketua_komite
        }
      });

        
      if (!existingRow) {
        const masukNotifikasi = await prisma.notifikasi_karyawan.create({
          data: {
            eventtalentid: row.id,
            nippos: row.nippos_ketua_komite,
            id_referensi_notifikasi: 5,
            dibuat_pada: new Date(),
            read_status: false
          }
        })
      }}

    res.status(200).json({message: "done"});
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
