import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getparameterqual", async (req, res) => {
  try {
    const tipekomite = parseInt(req.query.tipekomite)
    const detail = await prisma.$queryRaw`
SELECT 
    CASE 
        WHEN (ptq.id_kriteria_penilaian  = 1 OR ptq.id_kriteria_penilaian  = 2 OR ptq.id_kriteria_penilaian = 3 OR ptq.id_kriteria_penilaian = 4 ) THEN 'Competency'
        ELSE kp.nama_kriteria_penilaian
    END AS nama_kriteria_penilaian, 
    skor_minimal  
FROM 
    "Parameter_Talent_Qualification" ptq 
LEFT JOIN 
    "Kriteria_Penilaian" kp 
ON 
    ptq.id_kriteria_penilaian = kp.id_kriteria_penilaian
WHERE 
    ptq.id_komite_talent = ${tipekomite}`

const resultObject = detail.reduce((acc, curr) => {
  acc[curr.nama_kriteria_penilaian] = curr.skor_minimal;
  return acc;
}, {});

// Joining the values into a single string


    res.status(200).json(resultObject);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
