import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getclustertable", async (req, res) => {
  try {
	const eventid = parseInt(req.query.eventtalentid)
    const detail = await prisma.$queryRaw`
   select 
k.nama, 
tc.nippos,
concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi",
k.job_level as "Job Level",
rrj.nama_rumpun_jabatan  as "Rumpun Jabatan",
rk.nama_kantor as "Nama Kantor",
	k2.nama as "Komite Unit",
	psy.skor as "Competency/Psychotest",
	pms.skor as "PMS",
	akhlak.skor as "AKHLAK",
	la.skor as "Learning Agility",
	days.skor as "days",
	mk."Nama_Matriks_Kategori" as "Matriks Kategori Awal",
	mk2."Nama_Matriks_Kategori" as "Matriks Kategori Akhir"
from "Talent_Cluster" tc 
left join "Karyawan" k on tc.nippos = k.nippos
left join "Karyawan" k2 on tc.komite_unit = k2.nippos
left join "Referensi_Jabatan" rj on k.kode_jabatan = rj.id
left join "Referensi_Bagian" rb on k.kode_bagian = rb.id
left join "Referensi_Kantor" rk ON rk.nopend = k.kode_nopend
left join "Referensi_Rumpun_Jabatan" rrj ON k.rumpun_jabatan = rrj.kode_rumpun_jabatan
left join(	select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian in (1,2,3,4)) as psy on tc.nippos = psy.nippos
left join(	select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 5) as pms on tc.nippos = pms.nippos
left join(	select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 6) as akhlak on tc.nippos = akhlak.nippos
left join(	select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 7) as la on tc.nippos = la.nippos
left join(select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 8) as days on tc.nippos = days.nippos			
join matriks_kategori mk on tc."Id_Matriks_Kategori_Awal" = mk."Id"
join matriks_kategori mk2 on tc."Id_Matriks_Kategori_Akhir" = mk2."Id"
    where tc.eventtalentid = ${eventid};`
    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
