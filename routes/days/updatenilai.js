import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/skordays", async (req, res) => {
  try {
    const nippos = req.body.nippos;
    const skor = req.body.skor;

    const masukSkorDays = skor.map(async (nilai) => {
      await prisma.talent_Days.updateMany({
        where: {
          nippos: nippos,
          id_pertanyaan: parseInt(1,2,3),
        },
        data: {
          skor: parseFloat(nilai)
        },
      });
    });

    await Promise.all(masukSkorDays);

    res.status(200).json({ message: "Skor berhasil diperbarui" });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
