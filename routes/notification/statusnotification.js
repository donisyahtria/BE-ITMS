import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatestatusnotif", async (req, res) => {
  try {
    const updatestatus = await prisma.notifikasi_karyawan.updateMany({
        where:{
            nippos: req.body.nippos,
            eventtalentid: parseInt(req.body.eventid),
            id_referensi_notifikasi: parseInt(req.body.jenis_notifikasi)
        },
        data:{
            read_status:true
        }
    })

    res.status(200).json({ updatestatus });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;