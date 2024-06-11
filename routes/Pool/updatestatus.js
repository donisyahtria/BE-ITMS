import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatestatuspool", async (req, res) => {
  try {
    const status = parseInt(req.body.status)
    const nippos = req.body.nippos
    const eventid = parseInt(req.body.eventtalentid)
    const statustalentValue = status === 1 ? true : false;

    const updatestatus = await prisma.talent_pool.updateMany({
        where:{
            nippos: nippos,
            eventtalentid: eventid
        },
        data:{
            statustalent: statustalentValue
        }
    })
    res.status(200).json({message: "done" });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;