import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updateevent", async (req, res) => {
  try {
    const event_id = req.body.eventid;

const updateevent = await prisma.event_Talent.updateMany({
    where:{
      id: event_id
    },
    data:{
      nama_event: req.body.nama_event,
      kode_rumpun_jabatan: req.body.kode_rumpun_jabatan,
      kuota: parseInt(req.body.kuota),
      deskripsi: req.body.deskripsi,
      tanggal_mulai: req.body.tanggal_mulai,
      tanggal_selesai: req.body.tanggal_selesai
    }
  })

    

    res.status(200).json({message:"success"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
