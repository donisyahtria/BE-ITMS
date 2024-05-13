import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getdetailtalent", async (req, res) => {
  try {
    const getdetailtalent = await prisma.$queryRaw`
select 
CAST(ROW_NUMBER() OVER () AS VARCHAR) AS id,
k.nama as "nama", 
tp.nippos as "nippos", 
CONCAT(rj.nama_jabatan, ' ', rb.nama_bagian) AS "posisi",
tp.leveljabatan as "joblevel",
rrj.nama_rumpun_jabatan as "jobfam",
rk.nama_kantor as "nama_kantor",
et.nama_event as "nama_event"
from talent_pool tp 
left join "Karyawan" k 
on tp.nippos = k.nippos 
left join "Referensi_Rumpun_Jabatan" rrj 
on tp.rumpunjabatan = rrj.kode_rumpun_jabatan 
left join "Referensi_Kantor" rk 
on k.kode_nopend = rk.nopend
left join "Event_Talent" et
on tp.eventtalentid = et.id 
left join "Referensi_Jabatan" rj 
on k.kode_jabatan = rj.id
left join "Referensi_Bagian" rb 
on k.kode_bagian  = rb.id `


    res.status(200).json(getdetailtalent);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
