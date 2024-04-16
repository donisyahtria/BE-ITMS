import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getunderperson", async (req, res) => {
  try {

    const karyawanBawahan = await prisma.kandidat_Talent_dan_Source.findMany({
      where: {
        relasiNippos: {
          jabatan: {
            jabbawah: {
              some: {
                kode_jabatan_atasan: 4,
              },
            },
          },
          bagian: {
            bagbawah: {
              some: {
                kode_bagian_atasan: 215,
              },
            },
          },
        },
      },

    });

    res.status(200).json(karyawanBawahan);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
