import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getquestionevent", async (req, res) => {
  try {
    const eventtalentid = parseInt(req.query.eventtalentid)

    const getactivequestion = await prisma.event_Pertanyaan.findMany({
        where: {
            eventid: eventtalentid,
        },
        select:{
            id_pertanyaan: true,
            idpertanyaan:{
                select:{
                    pertanyaan: true
                }
            }
        }
    })
    res.status(200).json(getactivequestion);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
