import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatenki", async (req, res) => {
  try {
    const { message } = req.body;

    // Log the entire message array
    console.log(message);
    const array = message.message

    // Create an array to hold the promises
    const operations = array.map(async (item) => {
      const { nippos, nki_score, year } = item;

      // Find the record if it exists
      const cariAda = await prisma.skor_Performance.findFirst({
        where: {
          nippos: nippos,
          tahun: parseInt(year),
        },
        select: {
          nippos: true,
          skor: true,
          tahun: true,
        },
      });

      if (!cariAda) {
        // Create a new record if it doesn't exist
        const buatBaru = await prisma.skor_Performance.create({
          data: {
            nippos: nippos,
            skor: parseFloat(nki_score),
            tahun: parseInt(year),
          },
        });
        return { type: "create", data: buatBaru };
      } else {
        // Update the existing record
        const updatePromises = await prisma.skor_Performance.updateMany({
          where: {
            nippos: nippos,
            tahun: parseInt(year),
          },
          data: {
            skor: parseFloat(nki_score),
          },
        });
        return { type: "update", data: updatePromises };
      }
    });

    // Wait for all operations to complete
    const results = await Promise.all(operations);

    // Respond with the results
    res.status(200).json({ message: "Success", results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
