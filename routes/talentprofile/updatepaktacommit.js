import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatepaktacommit", async (req, res) => {
  try {
    const masukProfile = await prisma.talent_Profile.update({
      where: {
        id: req.body.id
      },
      data: {
        pakta_integritas: req.body.pakta_integritas,
        commitmenletter: req.body.commitmenletter
      },
    });

    res.status(200).json({ masukProfile });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;