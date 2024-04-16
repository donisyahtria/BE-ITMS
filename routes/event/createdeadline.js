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

        /*
        deadline_1: req.body.deadline_1 ? new Date(req.body.deadline_1) : null,
        deadline_2: req.body.deadline_2 ? new Date(req.body.deadline_2) : null,
        deadline_3: req.body.deadline_3 ? new Date(req.body.deadline_3) : null,
        deadline_4: req.body.deadline_4 ? new Date(req.body.deadline_4) : null,
        deadline_5: req.body.deadline_5 ? new Date(req.body.deadline_5) : null,
        deadline_6: req.body.deadline_6 ? new Date(req.body.deadline_6) : null 
        */
      },
    });

    res.status(200).json(createdead);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
