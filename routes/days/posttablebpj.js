import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createdaysbpj", async (req, res) => {
  try {
    const eventid = parseInt(req.body.eventtalentid)
    const activeStatuses = await prisma.$queryRaw`
    select 
et.nippos_ketua_komite as "nippos"
from "Event_Talent" et
where et.id = ${eventid}
union
select 
kte.nippos
from "Komite_Talent_Event" kte
where eventid = ${eventid}
union 
select distinct 
td.komite_unit as "nippos"
from "Talent_Days" td
where td.eventtalentid =${eventid}
and td.komite_unit is not null;`

    for (const row of activeStatuses) {
      const eventId = eventid;
      // Check if the event_id exists in the insertedEventIds table
      const existingRow = await prisma.daftar_bpj_event.findFirst({
        where: {
          eventtalentid: eventId,
          nippos: row.nippos
        }
      });
      console.log(row);

      if (!existingRow) {
        const masukbpj = await prisma.daftar_bpj_event.create({
          data: {
            nippos: row.nippos,
            eventtalentid: eventid
          }
        })
      }}

      // const profilesToCreate = activeStatuses.map(status => ({
      //   nippos: status.nippos,
      //   eventtalentid: status.eventtalentid,
      //   komite_unit: status.komite_unit,
      //   pakta_integritas: false,
      //   commitmenletter: false,
      //   createdAt: new Date()
      // }));

      // const createdProfiles = await prisma.talent_Profile.createMany({
      //   data: profilesToCreate,
      // });

      res.status(200).json({message: "done" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
  });

export default router;

