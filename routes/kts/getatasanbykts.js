import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/getkomiteunit", async (req, res) => {
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

    const masukKomite = await Promise.all(
      karyawanBawahan.map(async (filter) => {
        await prisma.kandidat_Talent_dan_Source.update({
          where: {
            id: filter.id,
          },
          data: {
            relasiKomiteUnit: { connect: { nippos: filter.nippos } },
          },
        });
      })
    );

    res.status(200).json(karyawanBawahan, masukKomite);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
