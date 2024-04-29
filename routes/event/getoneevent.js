import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getoneevent", async (req, res) => {
  try {
    const eventid = parseInt(req.query.id)
    const event = await prisma.event_Talent.findFirst({
        where:{
            id: eventid
        },
        select:{
            id: true,
            nama_event:true,
            deskripsi: true,
            tipekomite:{
                select:{
                    tipe_komite_talent: true
                }
            },
            kode_rumpun_jabatan:true,
            rumpun:{
                select:{
                    nama_rumpun_jabatan: true
                }
            },
            tanggal_mulai: true,
            tanggal_selesai: true,
            evenstatus_id: true
        }
    });
    res.status(200).json({ event });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
