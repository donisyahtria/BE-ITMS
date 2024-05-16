import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/assignkomiteunibybutton", async (req, res) => {
    try {
        const nip = req.body.nippos;
        const eventid = parseInt(req.body.eventtalentid)
    
        // Check if there are any records with the current nip and role_id equal to 4
        const existingRecord = await prisma.role_Karyawan.findFirst({
          where: {
            nippos: nip,
            role_id: 4
          }
        });

        const existingNotification = await prisma.notifikasi_karyawan.findFirst({
          where: {
            nippos: nip,
            id_referensi_notifikasi: 2,
            eventtalentid: eventid
          }
        });
    
        // If no existing record found, create new record
        if (!existingRecord) {
          await prisma.role_Karyawan.create({
            data: {
              nippos: nip,
              role_id: 4
            }
          });
        }

        if (!existingNotification) {
          await prisma.notifikasi_karyawan.createMany({
            data: {
              eventtalentid: eventid,
              nippos: nip,
              id_referensi_notifikasi: 2,
              dibuat_pada: new Date(),
              read_status: false
            }
          });
        }

    res.status(200).json("done");
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
