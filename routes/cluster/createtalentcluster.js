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
    console.log(persons);

    const masukcluster = await Promise.all(
      persons.map(async (filter) => {
        const loopmasukcluster = await prisma.talent_Cluster.createMany({
          data: {
            nippos: filter.nippos,
            eventtalentid: filter.eventtalentid,
            createdAt: new Date(),
            ketua_komite_talent: filter.nippos_ketua_komite 
          },
        });
        return loopmasukcluster
      })
    );

    res.status(200).json({ persons });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
});

export default router;