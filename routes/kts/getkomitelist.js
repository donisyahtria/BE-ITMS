import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkomiteunitlist", async (req, res) => {
  try {
    const eventid = Number(req.query.eventtalentid);
    const detail = await prisma.$queryRaw`
    SELECT  DISTINCT
    k2.nama AS "Komite Unit",
    k2.nippos AS "Nippos",
    CONCAT(rj.nama_jabatan, ' ', rb.nama_bagian) AS "Posisi",
    rrj.nama_rumpun_jabatan AS "Job Family",
    rk.nama_kantor AS "Nama Kantor",
    CASE 
        WHEN EXISTS (
            SELECT 1
            FROM "Kandidat_Talent_dan_Source" k
            WHERE k.komite_unit = k2.nippos
            AND k.status_talensource = true
        ) THEN 'Sudah Memilih'
        ELSE 'Belum Memilih'
    END AS "Status Memilih"
FROM 
    "Karyawan" k2
JOIN 
    "Kandidat_Talent_dan_Source" k ON k.komite_unit = k2.nippos
JOIN 
    "Referensi_Jabatan" rj ON rj.id = k2.kode_jabatan
JOIN 
    "Referensi_Bagian" rb ON rb.id = k2.kode_bagian
JOIN 
    "Referensi_Rumpun_Jabatan" rrj ON rrj.kode_rumpun_jabatan = k2.rumpun_jabatan
JOIN 
    "Referensi_Kantor" rk ON rk.nopend = k2.kode_nopend
AND k.eventtalentid = ${eventid};
    `
    //const tabelsourceevent = detail.filter(detail => detail.eventtalentid === eventid);


    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
