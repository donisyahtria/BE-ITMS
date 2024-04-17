import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updateskorperform", async (req, res) => {
  try {

    const ambilNippos = await prisma.talent_Qualification.findMany({
        distinct:['nippos']
    })

    const bandingNilai = await Promise.all(
        ambilNippos.map(async (filter) => {
            const updateNilai = await prisma.talent_Qualification.updateMany({
                  where: {
                    AND:[
                        {nippos: filter.nippos},
                        {id_kriteria_penilaian: 5}
                    ]
                  }
                });
                return updateNilai
            })
        );

    res.status(200).json({bandingNilai});
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
