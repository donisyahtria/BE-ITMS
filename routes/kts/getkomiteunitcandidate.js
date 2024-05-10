import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkomiteunitcandidate", async (req, res) => {
  try {
    const detail = await prisma.$queryRaw`
    SELECT  DISTINCT
    k.nama AS "nama",
    k.nippos AS "nippos",
    CONCAT(rj.nama_jabatan, ' ', rb.nama_bagian) AS "jabatan",
    rk.nama_kantor AS "kantor"
FROM 
    "Karyawan" k
JOIN 
    "Referensi_Jabatan" rj ON rj.id = k.kode_jabatan
JOIN 
    "Referensi_Bagian" rb ON rb.id = k.kode_bagian
JOIN 
    "Referensi_Kantor" rk ON rk.nopend = k.kode_nopend
    `
    //const tabelsourceevent = detail.filter(detail => detail.eventtalentid === eventid);


    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
