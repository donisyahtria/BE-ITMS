import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createtdays", async (req, res) => {
  try {
    const persons = await prisma.$queryRaw`
    SELECT tq.nippos, tq.eventtalentid ,ep.id_pertanyaan, tq.komite_unit
    FROM "Talent_Qualification" tq
    RIGHT JOIN "Event_Pertanyaan" ep
    ON tq.eventtalentid = ep.eventid
    WHERE tq.status = true
    AND tq.id_kriteria_penilaian != 8
    GROUP BY tq.nippos, tq.eventtalentid ,ep.id_pertanyaan, tq.komite_unit
    HAVING COUNT(*) = 4;`;
    console.log(persons);

    for (const row of persons) {
      const eventId = row.eventtalentid;
      // Check if the event_id exists in the insertedEventIds table
      const existingRow = await prisma.talent_Days.findFirst({
        where: {
          eventtalentid: eventId,
          nippos: row.nippos,
          id_pertanyaan: row.id_pertanyaan
        }
      });

      if (!existingRow) {
        const loopmasukdays = await prisma.talent_Days.createMany({
          data: {
            nippos: row.nippos,
            eventtalentid: row.eventtalentid,
            komite_unit: row.komite_unit,
            skor: 0
,
            id_pertanyaan: row.id_pertanyaan,
            createdAt: new Date(),
            eventtalentid: row.eventtalentid
          },
        });
      }}

//     const masukDays = await Promise.all(
//       persons.map(async (filter) => {
//         const loopmasukdays = await prisma.talent_Days.createMany({
//           data: {
//             nippos: filter.nippos,
//             eventtalentid: filter.eventtalentid,
//             komite_unit: filter.komite_unit,
//             skor: 0
// ,
//             id_pertanyaan: filter.id_pertanyaan,
//             createdAt: new Date(),
//             eventtalentid: filter.eventtalentid
//           },
//         });
//         return loopmasukdays
//       })
//     );

    res.status(200).json({ message: "done" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
});

export default router;