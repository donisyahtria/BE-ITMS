import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getparameterkuota", async (req, res) => {
  try {
    const id = parseInt(req.query.id)
    const detail = await prisma.$queryRaw`
SELECT 
    'kuota' as "keterangan",
    pk.bobot
FROM 
    "Parameter_Kuota" pk
WHERE 
    pk.id = ${id}`

const resultObject = detail.reduce((acc, curr) => {
  acc[curr.keterangan] = curr.bobot;
  return acc;
}, {});

    res.status(200).json(resultObject);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
