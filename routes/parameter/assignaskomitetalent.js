import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/assignaskomitetalent", async (req, res) => {
    try {
        const { nippos, komiteTalentId } = req.body;

        const row = await prisma.karyawan.findFirst({
            where: {
                nippos: nippos
            }
        });

        console.log('id_komite_talent:', komiteTalentId);
        console.log('kode_jabatan:', row.kode_jabatan);
        console.log('kode_bagian:', row.kode_bagian);

        // Check if the combination already exists
        const existingEntry = await prisma.komite_Talent.findFirst({
            where: {
                id_komite_talent: parseInt(komiteTalentId),
                kode_jabatan: row.kode_jabatan,
                kode_bagian: row.kode_bagian
            }
        });

        if (existingEntry) {
            return res.status(400).json({ message: "The data already exists" });
        }

        // Get the largest existing ID in the komite_Talent table
        const maxIdResult = await prisma.komite_Talent.aggregate({
            _max: {
                id: true
            }
        });

        const newId = maxIdResult._max.id ? maxIdResult._max.id + 1 : 1;

        // Create new entry
        const tambahkomitetalent = await prisma.komite_Talent.create({
            data: {
                id: newId,
                id_komite_talent: parseInt(komiteTalentId),
                posisi_komite_talent: "Anggota",
                kode_jabatan: row.kode_jabatan,
                kode_bagian: row.kode_bagian
            }
        });

        res.status(200).json({ message: "Data berhasil ditambah" });
    } catch (err) {
        console.log({ err });
        res.status(500).json({ message: "Internal server error", err });
    }
});

export default router;
