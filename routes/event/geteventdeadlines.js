import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/geteventdeadline", async (req, res) => {
    const eventtalentid = parseInt(req.query.eventtalentid);
    try {
      const eventtime = await prisma.deadline_Event_Step.findMany({
        where:{
          event_id: eventtalentid,
        },
        select:{
          startdate_1: true,
          deadline_1: true,
          startdate_2: true,
          deadline_2: true,
          startdate_3: true,
          deadline_3: true,
          startdate_4: true,
          deadline_4: true,
          startdate_5: true,
          deadline_5: true,
          startdate_6: true,
          deadline_6: true,
          eventselesai:true
        }
      })
      res.status(200).json(eventtime)
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Internal server error", err });
      
    }
});

export default router;