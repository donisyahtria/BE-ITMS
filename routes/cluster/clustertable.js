import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getclustertable", async (req, res) => {
  try {
	const eventid = parseInt(req.query.eventtalentid)
    const detail = await prisma.$queryRaw`
    select distinct
    k.nama, 
    tc.nippos,
    CONCAT(rj.nama_jabatan, ' ', rb.nama_bagian) AS "Posisi",
    k.job_level AS "Job Level",
    rrj.nama_rumpun_jabatan AS "Rumpun Jabatan",
    rk.nama_kantor AS "Nama Kantor",
    k2.nama AS "Komite Unit",
    psy.skor AS "Competency/Psychotest",
    pms.skor AS "PMS",
    akhlak.skor AS "AKHLAK",
    la.skor AS "Learning Agility",
    days.skor AS "days",
    mk."Nama_Matriks_Kategori" AS "Matriks Kategori Awal",
    mk2."Nama_Matriks_Kategori" AS "Matriks Kategori Akhir",
    CASE
        WHEN tc."Id_Matriks_Kategori_Awal" = tc."Id_Matriks_Kategori_Akhir" THEN 'Tetap'
        WHEN tc."Id_Matriks_Kategori_Awal" > tc."Id_Matriks_Kategori_Akhir" THEN 'Naik'
        ELSE 'Turun'
    END AS status
FROM 
    "Talent_Cluster" tc 
LEFT JOIN 
    "Karyawan" k ON tc.nippos = k.nippos
LEFT JOIN 
    "Karyawan" k2 ON tc.komite_unit = k2.nippos
LEFT JOIN 
    "Referensi_Jabatan" rj ON k.kode_jabatan = rj.id
LEFT JOIN 
    "Referensi_Bagian" rb ON k.kode_bagian = rb.id
LEFT JOIN 
    "Referensi_Kantor" rk ON rk.nopend = k.kode_nopend
LEFT JOIN 
    "Referensi_Rumpun_Jabatan" rrj ON k.rumpun_jabatan = rrj.kode_rumpun_jabatan
LEFT JOIN 
    (SELECT tq.nippos, tq.skor, tq.status
    FROM "Talent_Qualification" tq
    WHERE tq.id_kriteria_penilaian IN (1,2,3,4)
    and tq.eventtalentid = ${eventid}) AS psy ON tc.nippos = psy.nippos
LEFT JOIN 
    (SELECT tq.nippos, tq.skor, tq.status
    FROM "Talent_Qualification" tq
    WHERE tq.id_kriteria_penilaian = 5
    and tq.eventtalentid = ${eventid}) AS pms ON tc.nippos = pms.nippos
LEFT JOIN 
    (SELECT tq.nippos, tq.skor, tq.status
    FROM "Talent_Qualification" tq
    WHERE tq.id_kriteria_penilaian = 6
    and tq.eventtalentid = ${eventid}) AS akhlak ON tc.nippos = akhlak.nippos
LEFT JOIN 
    (SELECT tq.nippos, tq.skor, tq.status
    FROM "Talent_Qualification" tq
    WHERE tq.id_kriteria_penilaian = 7
    and tq.eventtalentid = ${eventid}) AS la ON tc.nippos = la.nippos
LEFT JOIN 
    (SELECT tq.nippos, tq.skor, tq.status
    FROM "Talent_Qualification" tq
    WHERE tq.id_kriteria_penilaian = 8
    and tq.eventtalentid = ${eventid}) AS days ON tc.nippos = days.nippos
LEFT JOIN 
    matriks_kategori mk ON tc."Id_Matriks_Kategori_Awal" = mk."Id"
LEFT JOIN 
    matriks_kategori mk2 ON tc."Id_Matriks_Kategori_Akhir" = mk2."Id"
WHERE 
    tc.eventtalentid = ${eventid};`
	
    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
