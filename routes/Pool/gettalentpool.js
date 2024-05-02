import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/gettalentpool", async (req, res) => {
  try {
    const detail = await prisma.$queryRaw`select 
	k.nama as "Nama",
	k.nippos as "Nippos",
	concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi",
	k.job_level as "Job Level", 
	rrj.nama_rumpun_jabatan as "Rumpun Jabatan", 
	rk.nama_kantor as "Nama Kantor",
	mk."Nama_Matriks_Kategori" as "Kategori Matrix Akhir", 
	tp.statustalent as "Status"
    from talent_pool tp 
    join "Karyawan" k on k.nippos = tp.nippos 
    join "Referensi_Jabatan" rj on rj.id = k.kode_jabatan
    join "Referensi_Bagian" rb on rb.id = k.kode_bagian
    join "Referensi_Rumpun_Jabatan" rrj on rrj.kode_rumpun_jabatan = k.rumpun_jabatan
    join "Referensi_Kantor" rk on rk.nopend = k.kode_nopend
    join matriks_kategori mk on mk."Id" = tp.id_matriks_kategori 
    `
    res.status(200).json({ Message : detail });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
