import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatedeadline", async (req, res) => {
  try {
    const event_id = req.body.eventid;
    const status   = req.body.status;
    const date     = req.body.date;

    let deadlineFieldToUpdate;
    switch (status) {
    case 2:
        deadlineFieldToUpdate = 'deadline_2';
        break;
    case 3:
        deadlineFieldToUpdate = 'deadline_3';
        break;
    case 4:
        deadlineFieldToUpdate = 'deadline_4';
        break;
    case 5:
        deadlineFieldToUpdate = 'deadline_5';
        break;
    case 6:
        deadlineFieldToUpdate = 'deadline_6';
        break;
    default:
        throw new Error('Invalid deadline_id');
}

const data = {
    [deadlineFieldToUpdate]: new Date(date),
};
console.log(deadlineFieldToUpdate);

const updatedead = await prisma.deadline_Event_Step.updateMany({
    where: {
        event_id: event_id,
    },
    data: data,
});

const newstatus = status + 1

const updatestatusevent = await prisma.event_Talent.updateMany({
    where:{
      id: event_id
    },
    data:{
      evenstatus_id: newstatus
    }
  })

    

    res.status(200).json({message: "done"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
