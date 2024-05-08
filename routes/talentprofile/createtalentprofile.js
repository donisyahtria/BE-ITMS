import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createtalentprofile", async (req, res) => {
  try {
    const eventid = parseInt(req.body.eventtalentid)
    const activeStatuses = await prisma.kandidat_Talent_dan_Source.findMany({
      where: {
        status_talensource: true,
        eventtalentid: eventid
      },
    });

    for (const row of activeStatuses) {
      const eventId = row.eventtalentid;
      // Check if the event_id exists in the insertedEventIds table
      const existingRow = await prisma.talent_Profile.findFirst({
        where: {
          eventtalentid: eventId,
          nippos: row.nippos
        }
      });

      if (!existingRow) {
        const masukProfile = await prisma.talent_Profile.createMany({
          data: {
            nippos: row.nippos,
            eventtalentid: row.eventtalentid,
            komite_unit: row.komite_unit,
            pakta_integritas: false,
            commitmenletter: false,
            createdAt: new Date(),
            status_submit: null
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
