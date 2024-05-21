import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/addskorakhlak", async (req, res) => {
  const akhlakDataArray = req.body.data; // Assuming the data comes in as an array under the key 'data'

  if (!Array.isArray(akhlakDataArray) || akhlakDataArray.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input data format or empty array" });
  }

  try {
    for (const data of akhlakDataArray) {
        console.log(data);
        const existingRow = await prisma.skor_AKHLAK.findFirst({
            where: {
                nippos: data.nippos
            }
        })

        if (existingRow) {
            const updateAkhlak = await prisma.skor_AKHLAK.updateMany({
                where: {
                    nippos: data.nippos
                },
                data: {
                    skor: parseFloat(data.skor),
                    Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                    Berlaku_Hingga: new Date(data.Berlaku_Hingga),
                }
            })
        }
        else { 
            const createAkhlak = await prisma.skor_AKHLAK.create({
                data: {
                nippos: data.nippos,
                skor: parseFloat(data.skor),
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
                },
            });
        }
    };


    res.status(200).json({ message: "True" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;