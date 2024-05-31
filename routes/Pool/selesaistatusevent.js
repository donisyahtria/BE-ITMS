import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/statusselesai", async (req, res) => {
  try {
    const event_id = parseInt(req.body.eventid);
    const currentDate = new Date();
    const twoYearsFromNow = new Date(currentDate);
    twoYearsFromNow.setFullYear(currentDate.getFullYear() + 2);

const updatedeadline = await prisma.deadline_Event_Step.updateMany({
  where:{
    event_id: event_id,
  },
  data:{
    eventselesai: new Date()
  }
})

const updateberlakupool = await prisma.talent_pool.updateMany({
  where:{
    eventtalentid: event_id
  },
  data:{
    Berlaku_Mulai: new Date(),
    Berlaku_Hingga: twoYearsFromNow
  }
})


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
