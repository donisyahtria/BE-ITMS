import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getpopulasi", async (req, res) => {
  try {
    const pool = await prisma.talent_pool.findMany({
      where: {
        statustalent: true,
        relasievent:{
          evenstatus_id: 8
        }
      },
    });

    const karyawan = await prisma.karyawan.findMany({
        where: {
          job_level: {
            notIn: ['F3', 'F2', 'F1', '']
          }
        }
      });

    const jumlahpool = pool.length;
    console.log("jumlah pool:", jumlahpool);
    const jumlahkaryawan = karyawan.length;
    console.log("jumlah karyawan:", jumlahkaryawan);
    const total = jumlahpool / jumlahkaryawan;
    const showTotal = jumlahpool + ' / ' + jumlahkaryawan

    res.status(200).json(showTotal);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
