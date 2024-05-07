import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/notifkomiteunit", async (req, res) => {
  try {    
    const eventid = parseInt(req.body.eventtalentid)
    const detail = await prisma.kandidat_Talent_dan_Source.findMany({
        select:{
            eventtalentid:true,
            komite_unit:true
        },
        where:{
            eventtalentid: eventid,
            komite_unit:{
                not: null,
            }
        },
        distinct:  ['komite_unit']
    })

    for (const row of detail) {
      const eventId = row.eventtalentid;
      // Check if the event_id exists in the insertedEventIds table
      const existingRow = await prisma.notifikasi_karyawan.findFirst({
        where: {
          eventtalentid: eventId,
          nippos: row.komite_unit
        }
      });

        
      if (!existingRow) {
        const masukNotifikasi = await prisma.notifikasi_karyawan.create({
          data: {
            eventtalentid: row.eventtalentid,
            nippos: row.komite_unit,
            id_referensi_notifikasi: 2,
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
