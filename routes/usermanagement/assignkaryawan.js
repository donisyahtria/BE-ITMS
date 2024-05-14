import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/assignkaryawan", async (req, res) => {
  try {
    const eventid = parseInt(req.body.eventid);

    // Find all nippos related to the eventid
    const nippos = await prisma.talent_Profile.findMany({
      select: {
        nippos: true
      },
      where: {
        eventtalentid: eventid
      }
    });

    // Loop through the array of nippos
    for (const nip of nippos) {
      // Check if there are any records with the current nip and role_id equal to 3
      const existingRecord = await prisma.role_Karyawan.findFirst({
        where: {
          nippos: nip.nippos,
          role_id: 3
        }
      });

      // If no existing record found, update
      if (!existingRecord) {
        await prisma.role_Karyawan.createMany({
          data: {
            nippos:nip.nippos,
            role_id: 3
          }
        });
      }
    }

    res.status(200).json(nippos);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
