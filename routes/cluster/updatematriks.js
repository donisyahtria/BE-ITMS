import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatematriks", async (req, res) => {
  try {
    const masukProfile = await prisma.talent_Cluster.updateMany({
        where:{
            eventtalentid: parseInt(req.body.eventid),
            nippos       : req.body.nippos,
        },
        data:{
            Id_Matriks_Kategori_Akhir: parseInt(req.body.matriks),
            alasan:   req.body.reason
        }
    })

    res.status(200).json({ masukProfile });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;