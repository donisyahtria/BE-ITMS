import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getdetailtalent", async (req, res) => {
  try {
    const getdetailtalent = await prisma.$queryRaw` 
SELECT 
    CAST(ROW_NUMBER() OVER () AS VARCHAR) AS id,
    k.nama AS "nama", 
    tp.nippos AS "nippos", 
    CONCAT(rj.nama_jabatan, ' ', rb.nama_bagian) AS "posisi",
    tp.leveljabatan AS "joblevel",
    rrj.nama_rumpun_jabatan AS "jobfam",
    rk.nama_kantor AS "nama_kantor",
    et.nama_event AS "nama_event",
    EXTRACT(YEAR FROM tp.dibuat_pada) AS "year"
FROM 
    talent_pool tp 
LEFT JOIN 
    "Karyawan" k ON tp.nippos = k.nippos 
LEFT JOIN 
    "Referensi_Rumpun_Jabatan" rrj ON tp.rumpunjabatan = rrj.kode_rumpun_jabatan 
LEFT JOIN 
    "Referensi_Kantor" rk ON k.kode_nopend = rk.nopend
LEFT JOIN 
    "Event_Talent" et ON tp.eventtalentid = et.id 
LEFT JOIN 
    "Referensi_Jabatan" rj ON k.kode_jabatan = rj.id
LEFT JOIN 
    "Referensi_Bagian" rb ON k.kode_bagian  = rb.id
    where et.evenstatus_id = 8;
 `;

    res.status(200).json(getdetailtalent);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
