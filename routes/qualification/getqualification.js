import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getqualification", async (req, res) => {
  try {
    const detail = await prisma.$queryRaw`
    select distinct 
	k.nama as "Nama",
	k.nippos as "Nippos",
	concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi",
	k.job_level as "Job Level", 
	rrj.nama_rumpun_jabatan as "Rumpun Jabatan", 
	rk.nama_kantor as "Nama Kantor",
	psy.skor as "Competency/Psychotest",
	pms.skor as "PMS",
	akhlak.skor as "AKHLAK",
	la.skor as "Learning Agility"
from "Talent_Qualification" tq
join "Karyawan" k on k.nippos = tq.nippos 
join "Referensi_Jabatan" rj on rj.id = k.kode_jabatan
join "Referensi_Bagian" rb on rb.id = k.kode_bagian
join "Referensi_Rumpun_Jabatan" rrj on rrj.id = k.rumpun_jabatan
join "Referensi_Kantor" rk on rk.nopend = k.kode_nopend
left join(	select tq.nippos, tq.skor
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian in (1,2,3,4)) as psy on tq.nippos = psy.nippos
left join(	select tq.nippos, tq.skor
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 5) as pms on tq.nippos = pms.nippos
left join(	select tq.nippos, tq.skor
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 6) as akhlak on tq.nippos = akhlak.nippos
left join(	select tq.nippos, tq.skor
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 7) as la on tq.nippos = la.nippos;
    `
    res.status(200).json({ Message : detail });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
