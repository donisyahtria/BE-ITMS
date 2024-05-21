import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/assignasbpj", async (req, res) => {
  try {
    const { nippos, eventtalentid } = req.body;

    // Check if the combination already exists
    const existingEntry = await prisma.daftar_bpj_event.findFirst({
      where: {
        nippos: nippos,
        eventtalentid: parseInt(eventtalentid)
      }
    });

    if (existingEntry) {
      return res.status(400).json({ message: "Combination of nippos and eventtalentid already exists" });
    }

    // Create new entry
    const tambahbpj = await prisma.daftar_bpj_event.create({
      data: {
        nippos: nippos,
        eventtalentid: parseInt(eventtalentid)
      }
    });

    res.status(200).json({ message: "Data berhasil ditambah" });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
