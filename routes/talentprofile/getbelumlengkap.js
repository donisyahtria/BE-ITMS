import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getbelumlengkap", async (req, res) => {
  try {
    const detail = await prisma.$queryRaw`select k.nama as "Nama", 
    k.nippos as "Nippos", 
    concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi", 
    k.job_level as "Job Level", 
    rrj.nama_rumpun_jabatan as "Rumpun Jabatan", 
    CASE WHEN tp.commitmenletter = FALSE THEN 'Belum Submit' ELSE 'Sudah Submit' END AS "Commitment Letter",
    CASE WHEN tp.pakta_integritas = FALSE THEN 'Belum Submit' ELSE 'Sudah Submit' END AS "Pakta Integritas",
    k2.nama as "Komite Unit"
  from "Talent_Profile" tp 
  join "Karyawan" k on k.nippos = tp.nippos
  left join "Karyawan" k2 on k2.nippos = tp.komite_unit 
  join "Referensi_Jabatan" rj on rj.id = k.kode_jabatan
  join "Referensi_Bagian" rb on rb.id = k.kode_bagian
  join "Referensi_Rumpun_Jabatan" rrj on rrj.id = k.rumpun_jabatan
  where tp.commitmenletter is false or tp.pakta_integritas is false;
    `
    res.status(200).json({ Message : detail });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
