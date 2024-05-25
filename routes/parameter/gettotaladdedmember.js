import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/gettotaladdedmember", async (req, res) => {
    try {
        const nippos = req.query.nippos;
        const totalmembers = await prisma.$queryRaw`
            select k.nippos, k.kode_jabatan, k.kode_bagian 
            from "Karyawan" k 
            inner join (
            select k2.kode_jabatan, k2.kode_bagian
            from "Karyawan" k2 
            where k2.nippos = ${nippos}) as k3
            on k.kode_jabatan = k3.kode_jabatan
            and k.kode_bagian = k3.kode_bagian`;
        res.status(200).json(totalmembers);
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

export default router;
