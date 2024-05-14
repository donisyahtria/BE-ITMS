import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getallprofile", async (req, res) => {
  try {
    const detail = await prisma.talent_Profile.findMany({
      select: {
        pakta_integritas:true,
        commitmenletter:true
      },
      where:{
        eventtalentid: parseInt(req.query.eventtalentid),
        nippos: req.query.nippos
      }
    });
    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
