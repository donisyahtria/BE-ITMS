import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updateparamqual", async (req, res) => {
  try {
    const tipekomite        = parseInt(req.body.tipekomite)
    const updatedCompetency = parseInt(req.body.competency);
    const updatedPerformance = parseInt(req.body.performance);
    const updatedAkhlak = parseInt(req.body.akhlak);
    const updatedLearningAgility = parseInt(req.body.learningagility);

    let kriteriaPenilaian;
    if (tipekomite === 1) {
      kriteriaPenilaian = 1;
    } else if (tipekomite === 2) {
      kriteriaPenilaian = [2, 3]; // For tipekomite 2, there are two kriteria_penilaian
    } else if (tipekomite === 3) {
      kriteriaPenilaian = 4;
    } else {
      return res.status(400).json({ message: "Invalid tipekomite value" });
    }
    
    if (Array.isArray(kriteriaPenilaian)) {
        // Update multiple kriteria_penilaian for tipekomite 2
        const updatePromises = kriteriaPenilaian.map(async (kriteria) => {
          return prisma.parameter_Talent_Qualification.updateMany({
            where: {
              id_komite_talent: tipekomite,
              id_kriteria_penilaian: kriteria
            },
            data: {
              skor_minimal: updatedCompetency
            },
          });
        });
  
        await Promise.all(updatePromises);
      } else {
        // Update single kriteria_penilaian
        await prisma.parameter_Talent_Qualification.updateMany({
          where: {
            id_komite_talent: tipekomite,
            id_kriteria_penilaian: kriteriaPenilaian
          },
          data: {
            skor_minimal: updatedCompetency
          },
        });
      }

          // Update performance score
    await prisma.parameter_Talent_Qualification.updateMany({
        where: {
          id_komite_talent: tipekomite,
          id_kriteria_penilaian: 5
        },
        data: {
          skor_minimal: updatedPerformance
        },
      });
  
      // Update akhlak score
      await prisma.parameter_Talent_Qualification.updateMany({
        where: {
          id_komite_talent: tipekomite,
          id_kriteria_penilaian: 6
        },
        data: {
          skor_minimal: updatedAkhlak
        },
      });
  
      // Update learning agility score
      await prisma.parameter_Talent_Qualification.updateMany({
        where: {
          id_komite_talent: tipekomite,
          id_kriteria_penilaian: 7
        },
        data: {
          skor_minimal: updatedLearningAgility
        },
      });

    res.status(200).json({message: "done"});
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;