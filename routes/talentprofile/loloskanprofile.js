import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/loloskanprofile", async (req, res) => {
  try {
    const masukProfile = await prisma.talent_Profile.updateMany({
        where: {
          eventtalentid: parseInt(req.body.eventid),
          OR: [
            { pakta_integritas: false },
            { commitmenletter: false }
          ]
        },
        data: {
          pakta_integritas: true,
          commitmenletter: true,
          status_submit: "Admin Talent"
        },
      });

    res.status(200).json({ masukProfile });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;