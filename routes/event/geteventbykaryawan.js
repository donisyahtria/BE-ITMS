import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/geteventbykaryawan", async (req, res) => {
  try {
    const event = await prisma.event_Talent.findFirst({
        where:{
           profile:{
            some:{
                nippos: req.body.nippos
            }
           }
        }
    });
    res.status(200).json({ event });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
