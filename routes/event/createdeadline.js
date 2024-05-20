import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/createdeadline", async (req, res) => {
  try {
    const createdead = await prisma.deadline_Event_Step.create({
      data: {
        event_id: req.body.event_id,
        deadline_1: new Date(req.body.deadline_1),
        deadline_2: new Date(req.body.deadline_2),
        deadline_3: new Date(req.body.deadline_3),
        deadline_4: new Date(req.body.deadline_4),
        deadline_5: new Date(req.body.deadline_5),
        deadline_6: new Date(req.body.deadline_6),
        startdate_1: new Date(req.body.startdate_1),
        startdate_2: new Date(req.body.startdate_2),
        startdate_3: new Date(req.body.startdate_3),
        startdate_4: new Date(req.body.startdate_4),
        startdate_5: new Date(req.body.startdate_5),
        startdate_6: new Date(req.body.startdate_6),
      },
    });

    const updatestatusevent = await prisma.event_Talent.update({
      where:{
        id: req.body.event_id
      },
      data:{
        evenstatus_id: req.body.status
      }
    })

    res.status(200).json(createdead);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
