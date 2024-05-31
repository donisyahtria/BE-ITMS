import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createpool", async (req, res) => {
  try {
    const eventid = parseInt(req.query.eventtalentid)
    const currentDate = new Date();

    // Add 2 years to the current date
    const twoYearsFromNow = new Date(currentDate);
    twoYearsFromNow.setFullYear(currentDate.getFullYear() + 2);


    const persons = await prisma.$queryRaw`
    SELECT tc.nippos, k."job_level", k."rumpun_jabatan", tc.eventtalentid, tc."Id_Matriks_Kategori_Akhir"
    FROM "Talent_Cluster" tc
    LEFT JOIN "Karyawan" k
    ON tc.nippos = k.nippos
    where tc."Id_Matriks_Kategori_Akhir" <= 4
    and tc.eventtalentid = ${eventid}
    GROUP BY tc.nippos, k."job_level", k."rumpun_jabatan", tc.eventtalentid, tc."Id_Matriks_Kategori_Akhir";`;
    console.log(persons);

    for (const row of persons) {
      const eventId = row.eventtalentid;
      // Check if the event_id exists in the insertedEventIds table
      const existingRow = await prisma.talent_pool.findFirst({
        where: {
          eventtalentid: eventId,
          nippos: row.nippos
        }
      });
      // console.log(existingRow);
      
          if (!existingRow) {
            const masukPool = await prisma.talent_pool.create({
              data: {
                nippos: row.nippos,
                leveljabatan: row.job_level,
                rumpunjabatan: row.rumpun_jabatan,
                eventtalentid: row.eventtalentid,
                statustalent: true,
                dibuat_pada: new Date(),
                id_matriks_kategori: row.Id_Matriks_Kategori_Akhir,
                Berlaku_Mulai: new Date(),
                Berlaku_Hingga: new Date(),
              }
            })
          }}


// const masukpool = await Promise.all(
    //   persons.map(async (filter) => {
    //     const loopmasukpool = await prisma.talent_pool.createMany({
    //       data: {
    //         nippos: filter.nippos,
    //         leveljabatan: filter.job_level,
    //         rumpunjabatan: filter.rumpun_jabatan,
    //         eventtalentid: filter.eventtalentid,
    //         statustalent: true,
    //         dibuat_pada: new Date(),
    //         id_matriks_kategori: filter.Id_Matriks_Kategori_Akhir,
    //         Berlaku_Mulai: new Date(),
    //         Berlaku_Hingga: twoYearsFromNow
    //       },
    //     });
    //     return loopmasukpool
    //   })
    // );

    res.status(200).json({ message: "done" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
});

export default router;