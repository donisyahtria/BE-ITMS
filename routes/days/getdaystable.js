import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/gettablekaryawandays", async (req, res) => {
  try {
    const eventid = parseInt(req.query.eventtalentid)
    const detail = await prisma.$queryRaw`
    select distinct 
	k.nama as "Nama", 
    k.nippos as "Nippos", 
    concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi", 
    k.job_level as "Job Level", 
    rrj.nama_rumpun_jabatan as "Rumpun Jabatan", 
    rk.nama_kantor as "Nama Kantor",
    k2.nama as "Komite Unit",
        CASE
        WHEN td.status THEN 'Sudah Diisi'
        ELSE 'Belum Diisi'
    END AS "Status"
  from "Talent_Days" td 
  join "Karyawan" k on k.nippos = td.nippos
  left join "Karyawan" k2 on k2.nippos = td.komite_unit 
  join "Referensi_Jabatan" rj on rj.id = k.kode_jabatan
  join "Referensi_Bagian" rb on rb.id = k.kode_bagian
  join "Referensi_Rumpun_Jabatan" rrj on rrj.kode_rumpun_jabatan = k.rumpun_jabatan
  join "Referensi_Kantor" rk on k.kode_nopend = rk.nopend
  where td.eventtalentid = ${eventid};`
    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
