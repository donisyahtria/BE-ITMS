import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getsijabinfo", async (req, res) => {
  try {
    const eventid = parseInt(req.query.eventtalentid)

    const getsijabinfo = await prisma.event_Talent.findFirst({
        where:{
            id: eventid
        },
        select:{
            jenis_bpj: true,
            tanggal_bpj: true,
            lokasi_bpj: true
        }
    })

    res.status(200).json(getsijabinfo);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
