import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatekuota", async (req, res) => {
  try {
    const id        = parseInt(req.body.id);
    const newscore  = parseInt(req.body.newscore);

    const updatescore = await prisma.parameter_Kuota.updateMany({
        where: {
            id: id,
        },
        data:{
            bobot: newscore
        }
    })


    res.status(200).json({message: "done"});
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;