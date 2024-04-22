import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createpool", async (req, res) => {
  try {
    const persons = await prisma.$queryRaw`
    SELECT tc.nippos, k."job_level", k."rumpun_jabatan", tc.eventtalentid, tc."Id_Matriks_Kategori_Akhir"
    FROM "Talent_Cluster" tc
    LEFT JOIN "Karyawan" k
    ON tc.nippos = k.nippos
    where tc."Id_Matriks_Kategori_Akhir" <= 4
    GROUP BY tc.nippos, k."job_level", k."rumpun_jabatan", tc.eventtalentid, tc."Id_Matriks_Kategori_Akhir";`;
    console.log(persons);

    const currentDate = new Date();

    // Add 2 years to the current date
    const twoYearsFromNow = new Date(currentDate);
    twoYearsFromNow.setFullYear(currentDate.getFullYear() + 2);

    const masukpool = await Promise.all(
      persons.map(async (filter) => {
        const loopmasukpool = await prisma.talent_pool.createMany({
          data: {
            nippos: filter.nippos,
            leveljabatan: filter.job_level,
            rumpunjabatan: filter.rumpun_jabatan,
            eventtalentid: filter.eventtalentid,
            statustalent: true,
            dibuat_pada: new Date(),
            id_matriks_kategori: filter.Id_Matriks_Kategori_Akhir,
            Berlaku_Mulai: new Date(),
            Berlaku_Hingga:twoYearsFromNow
          },
        });
        return loopmasukpool
      })
    );

    res.status(200).json({ persons });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
});

export default router;