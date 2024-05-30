import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getquallolos", async (req, res) => {
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
	COALESCE(cast(k2.nama as text), '-') as "Komite Unit",
	round(cast(psy.skor as numeric), 2) as "Competency/Psychotest",
	psy.status as "compstatus",
	round(cast(pms.skor as numeric), 2) as "PMS",
	pms.status as "pmsstatus",
	round(cast(akhlak.skor as numeric), 2) as "AKHLAK",
	akhlak.status as "akhlakstatus",
	round(cast(la.skor as numeric), 2) as "Learning Agility",
	la.status as "lastatus"
from "Talent_Qualification" tq
join "Karyawan" k on k.nippos = tq.nippos
left join "Karyawan" k2 on tq.komite_unit = k2.nippos
join "Referensi_Jabatan" rj on rj.id = k.kode_jabatan
join "Referensi_Bagian" rb on rb.id = k.kode_bagian
join "Referensi_Rumpun_Jabatan" rrj on rrj.kode_rumpun_jabatan = k.rumpun_jabatan
join "Referensi_Kantor" rk on rk.nopend = k.kode_nopend
left join(	select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian in (1,2,3,4)
			and tq.eventtalentid = ${eventid}) as psy on tq.nippos = psy.nippos
left join(	select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 5
			and tq.eventtalentid = ${eventid}) as pms on tq.nippos = pms.nippos
left join(	select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 6
			and tq.eventtalentid = ${eventid}) as akhlak on tq.nippos = akhlak.nippos
left join(	select tq.nippos, tq.skor, tq.status
			from "Talent_Qualification" tq
			where tq.id_kriteria_penilaian = 7
			and tq.eventtalentid = ${eventid}) as la on tq.nippos = la.nippos
Where       tq.eventtalentid = ${eventid}
and         tq.status = true
and         tq.id_kriteria_penilaian != 8
group by k.nama, k.nippos,rj.nama_jabatan,rb.nama_bagian,k.job_level,rrj.nama_rumpun_jabatan,rk.nama_kantor,k2.nama,psy.skor,psy.status,pms.skor,pms.status,akhlak.skor,akhlak.status,la.skor,la.status
having count(*) >= 4
    `
    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
