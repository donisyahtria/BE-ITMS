import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getjoblevelfilter", async (req, res) => {
    const idevent = req.idevent
    try {
      const jl = await prisma.job_Level_Event.findMany({
        where:  {
            idevent: idevent
        },
        select:{
          level_jabatan: true
        }
    })
    const result = jl.map(item => item.level_jabatan.toLowerCase());

      res.status(200).json({result})
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Internal server error", err });
      
    }
});

export default router;