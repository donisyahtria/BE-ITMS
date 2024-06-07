import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getprofile", async (req, res) => {
    const nippos = req.query.nippos

    try {
        const detail = await prisma.karyawan.findFirst({
            select: {
                nama: true,
                nippos: true,
                tanggal_lahir: true,
                jenis_kelamin: true,
                email: true,
                jabatan: {
                    select: {
                        nama_jabatan: true
                    }
                },
                bagian: {
                    select: {
                        nama_bagian: true
                    }
                },
                nopend: {
                    select: {
                        nopend: true,
                        nama_kantor: true
                    }
                }
            },
            where: {
                nippos: nippos
            }
        })

        res.status(200).json(detail);
    } catch (err) {
        console.log({ err });
        res.status(500).json({ message: "Internal server error", err });
    }
});

export default router;
