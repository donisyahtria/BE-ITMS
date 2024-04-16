import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getjobfamily", async (req, res) => {
    const job_fam = req.job_fam
    try {
      const fam = await prisma.referensi_Rumpun_Jabatan
      .findMany({
        where:  {
            status_aktif: "y"
        },
        select:{
          id:true,
          nama_rumpun_jabatan:true
        }
      })
      res.status(200).json({fam})
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Internal server error", err });
      
    }
});

export default router;