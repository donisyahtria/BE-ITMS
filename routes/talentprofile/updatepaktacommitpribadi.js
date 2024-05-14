import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatepaktacommitpribadi", async (req, res) => {
  try {
    const { datatoupdate, nippos, eventtalentid } = req.body;

let updateData;
if (datatoupdate === 1) {
    updateData = { pakta_integritas: true };
} else if (datatoupdate === 2) {
    updateData = { commitmenletter: true };
} else {
    // Handle unexpected values or throw an error
    return res.status(400).json({ error: 'Invalid datatoupdate value' });
}

const updatepaktacommit = await prisma.talent_Profile.updateMany({
    where: {
        nippos: nippos,
        eventtalentid: parseInt(eventtalentid),
    },
    data: updateData
});


    res.status(200).json({ updatepaktacommit });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;