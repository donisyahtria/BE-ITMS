import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getnotification", async (req, res) => {
  try {
	const nippos = req.query.nippos
    const getnotification = await prisma.$queryRaw`
    select eventtalentid, nippos,id_referensi_notifikasi, keterangan, pesan, read_status, dibuat_pada
from notifikasi_karyawan nk 
left join referensi_notifikasi rn 
on nk.id_referensi_notifikasi = rn.id 
where nippos=${nippos}`

    res.status(200).json(getnotification);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
