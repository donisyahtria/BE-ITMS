import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatekomiteunit", async (req, res) => {
  try {
    const nippos      = req.body.nippos
    const eventid     = Number(req.query.eventtalentid)
    const komite_unit = req.body.komite_unit

    const updatekomiteunit = await prisma.kandidat_Talent_dan_Source.updateMany({
        where:{
            eventtalentid: eventid,
            nippos: nippos
        },
        data:{
            komite_unit: komite_unit
        }
    })

    res.status(200).json("done");
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

export default router;