import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkkm", async (req, res) => {
  try {
	const idkomite = parseInt(req.body.id_komite_talent)
	const nilaiminimal = await prisma.parameter_Talent_Qualification.findMany({

	})
    res.status(200).json(nilaiminimal);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
