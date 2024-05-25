import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getanggotakomitetalent", async (req, res) => {
    try {
        const komitetalentid = Number(req.query.komitetalentid);
        const members = await prisma.$queryRaw`
        SELECT 
            k.nama,
            k.nippos,
            CONCAT(rj.nama_jabatan, ' ', rb.nama_bagian) AS "posisi",
            k.job_level as joblevel,
            rrj.nama_rumpun_jabatan AS "rumpunjabatan", 
            rk.nama_kantor AS "kantor"
        FROM "Komite_Talent" kt 
        LEFT JOIN "Karyawan" k 
            ON kt.kode_jabatan = k.kode_jabatan 
            AND kt.kode_bagian = k.kode_bagian 
        LEFT JOIN "Referensi_Jabatan" rj ON rj.id = k.kode_jabatan
        LEFT JOIN "Referensi_Bagian" rb ON rb.id = k.kode_bagian
        LEFT JOIN "Referensi_Rumpun_Jabatan" rrj ON rrj.kode_rumpun_jabatan = k.rumpun_jabatan
        LEFT JOIN "Referensi_Kantor" rk ON rk.nopend = k.kode_nopend
        WHERE kt.posisi_komite_talent = 'Anggota'
            AND kt.id_komite_talent = ${komitetalentid}
        ORDER BY k.job_level, rrj.nama_rumpun_jabatan, k.nama`;
        
        res.status(200).json(members);
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

export default router;
