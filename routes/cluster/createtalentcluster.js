import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createcluster", async (req, res) => {
  try {
    const persons = await prisma.$queryRaw`
    SELECT td.nippos, td.eventtalentid, et.nippos_ketua_komite
    FROM "Talent_Days" td
    LEFT JOIN "Event_Talent" et
    ON td.eventtalentid = et.id
    GROUP BY td.nippos, td.eventtalentid ,et.nippos_ketua_komite;`;

for (const row of persons) {
  const eventId = row.eventtalentid;
  // Check if the event_id exists in the insertedEventIds table
  const existingRow = await prisma.talent_Cluster.findFirst({
    where: {
      eventtalentid: eventId,
      nippos: row.nippos
    }
  });
  // console.log(existingRow);
  
      if (!existingRow) {
        const masukCluster = await prisma.talent_Cluster.create({
          data: {
            nippos: row.nippos,
            eventtalentid: row.eventtalentid,
            createdAt: new Date(),
            ketua_komite_talent: row.nippos_ketua_komite 
          }
        })
      }}

    // const masukcluster = await Promise.all(
    //   persons.map(async (filter) => {
    //     const loopmasukcluster = await prisma.talent_Cluster.createMany({
    //       data: {
    //         nippos: filter.nippos,
    //         eventtalentid: filter.eventtalentid,
    //         createdAt: new Date(),
    //         ketua_komite_talent: filter.nippos_ketua_komite 
    //       },
    //     });
    //     return loopmasukcluster
    //   })
    // );

    res.status(200).json({ message: "done" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
});

export default router;