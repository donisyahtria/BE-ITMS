import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatenilaibutton", async (req, res) => {
  try {
    const nippos = req.body.nippos; // Assuming this is a single value, not an array
    const data = req.body.data; // This is an array of objects
    const eventtalentid = parseInt(req.body.eventid);

    console.log(data);
    
    const updatePromises = data
    .filter(item => item !== null) // Filter out null items
    .map(item => {
        return prisma.talent_Days.updateMany({
            where: {
                nippos: nippos, // Assuming nippos is not an array
                id_pertanyaan: item.id_pertanyaan, // Use the current id_pertanyaan from the item
                eventtalentid: eventtalentid
            },
            data: {
                skor: parseFloat(item.nilaiInput), // Use the current nilaiInput from the item
            }
        });
    });


    const updatestatus = await prisma.talent_Days.updateMany({
          where: {
              nippos: nippos, // Assuming nippos is not an array
              eventtalentid: eventtalentid
          },
          data: {
              status: true
          }
      });
    
    await Promise.all(updatePromises);

        // Step 2: Calculate the average skor for the given nippos and eventtalentid
        const averageResult = await prisma.talent_Days.aggregate({
            _avg: {
              skor: true,
            },
            where: {
              nippos: nippos,
              eventtalentid: eventtalentid,
            },
          });

          const averageSkor = averageResult._avg.skor;

// Step 3: Update the Talent_Qualification table
await prisma.talent_Qualification.updateMany({
    where: {
      nippos: nippos,
      eventtalentid: eventtalentid,
      id_kriteria_penilaian: 8
    },
    data: {
      skor: averageSkor,
      status: true
    },
  });

  res.status(200).json({ message: "Scores updated successfully" })
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;