import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getjoblevel", async (req, res) => {
    const tipe_komite = parseInt(req.query.tipe_komite)
    try {
      
      const job = await prisma.parameter_Komite_Talent
      .findMany({
        where:  {
          id_komite_talent: tipe_komite
        },
        select:{
          job_level:true
        }
      })

      const job_level = job.map(job => job.job_level)
    
      res.status(200).json({job_level})
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Internal server error", err });
      
    }
});

export default router;