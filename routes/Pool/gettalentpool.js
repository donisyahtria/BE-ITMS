import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/gettalentpool", async (req, res) => {
  try {
    const eventid = parseInt(req.query.eventtalentid)
    const detail = await prisma.$queryRaw`
    SELECT 
    k.nama AS "Nama",
    k.nippos AS "Nippos",
    CONCAT(rj.nama_jabatan, ' ', rb.nama_bagian) AS "Posisi",
    k.job_level AS "Job Level", 
    rrj.nama_rumpun_jabatan AS "Rumpun Jabatan", 
    rk.nama_kantor AS "Nama Kantor",
    mk."Nama_Matriks_Kategori" AS "Kategori Matrix Akhir", 
    CASE 
        WHEN tp.statustalent = true THEN 'Talent'
        ELSE 'Non-Talent'
    END AS "Status"
FROM 
    talent_pool tp 
JOIN 
    "Karyawan" k ON k.nippos = tp.nippos 
JOIN 
    "Referensi_Jabatan" rj ON rj.id = k.kode_jabatan
JOIN 
    "Referensi_Bagian" rb ON rb.id = k.kode_bagian
JOIN 
    "Referensi_Rumpun_Jabatan" rrj ON rrj.kode_rumpun_jabatan = k.rumpun_jabatan
JOIN 
    "Referensi_Kantor" rk ON rk.nopend = k.kode_nopend
JOIN 
    matriks_kategori mk ON mk."Id" = tp.id_matriks_kategori
WHERE 
    tp.eventtalentid = ${eventid};

    `
    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
