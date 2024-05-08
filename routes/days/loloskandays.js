import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/loloskandays", async (req, res) => {
  try {
    const loloskandays = await prisma.talent_Days.updateMany({
        where: {
          eventtalentid: parseInt(req.body.eventid)
        },
        data: {
          skor: 5,
          status: true
        },
      });

    res.status(200).json({ message: "done" });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;