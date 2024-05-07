import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/statusselesai", async (req, res) => {
  try {
    const event_id = parseInt(req.body.eventid);


const updatestatusevent = await prisma.event_Talent.updateMany({
    where:{
      id: event_id
    },
    data:{
      evenstatus_id: 8
    }
  })

    

    res.status(200).json(updatestatusevent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
