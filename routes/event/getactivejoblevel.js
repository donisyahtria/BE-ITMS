import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getactivejoblevel", async (req, res) => {
    const eventid = Number(req.query.eventtalentid)
    try {
      const jl = await prisma.job_Level_Event.findMany({
        where:  {
            eventid: eventid
        },
        select:{
          level_jabatan:true
        }
      }) ;
      
      const levelJabatanArray = jl.map(item => item.level_jabatan); // Extracting just the 'level_jabatan' property into a new array
      res.status(200).json(levelJabatanArray);
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Internal server error", err });
      
    }
});

export default router;