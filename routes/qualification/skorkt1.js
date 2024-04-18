import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updateskorkt1", async (req, res) => {
  try {

    const ambilNippos = await prisma.talent_Qualification.findMany({
        distinct:['nippos']
    })

    const masukNilaiPerformance = await Promise.all(
        ambilNippos.map(async (filter) => {
            const nilaiPerform = await prisma.skor_Performance.findFirst({
                  where: {
                    nippos: filter.nippos,
                  }
                });
                const nilai = await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            {nippos: filter.nippos},
                            {id_kriteria_penilaian: 5}
                        ]
                    },
                    data:{
                        skor: nilaiPerform.skor,
                        berlaku_mulai: nilaiPerform.Berlaku_Mulai,
                        berlaku_hingga: nilaiPerform.Berlaku_Hingga
                    }
                })
                return nilai
            })
        );

        const masukNilaiLA = await Promise.all(
            ambilNippos.map(async (filter) => {
                const nilaiLA = await prisma.skor_LA.findFirst({
                      where: {
                        nippos: filter.nippos,
                      }
                    });
                    const nilai = await prisma.talent_Qualification.updateMany({
                        where: {
                            AND: [
                                {nippos: filter.nippos},
                                {id_kriteria_penilaian: 7}
                            ]
                        },
                        data:{
                            skor: nilaiLA.skor,
                            berlaku_mulai: nilaiLA.Berlaku_Mulai,
                            berlaku_hingga: nilaiLA.Berlaku_Hingga
                        }
                    })
                    return nilai
                })
            );

            const masukNilaiakhlak = await Promise.all(
                ambilNippos.map(async (filter) => {
                    const nilaiakhlak = await prisma.skor_AKHLAK.findFirst({
                          where: {
                            nippos: filter.nippos,
                          }
                        });
                        const nilai = await prisma.talent_Qualification.updateMany({
                            where: {
                                AND: [
                                    {nippos: filter.nippos},
                                    {id_kriteria_penilaian: 6}
                                ]
                            },
                            data:{
                                skor: nilaiakhlak.skor,
                                berlaku_mulai: nilaiakhlak.Berlaku_Mulai,
                                berlaku_hingga: nilaiakhlak.Berlaku_Hingga
                            }
                        })
                        return nilai
                    })
             );

             const masukNilaibumn = await Promise.all(
                ambilNippos.map(async (filter) => {
                    const nilaibumn = await prisma.skor_BUMN.findFirst({
                          where: {
                            nippos: filter.nippos,
                          }
                        });
                        const nilai = await prisma.talent_Qualification.updateMany({
                            where: {
                                AND: [
                                    {nippos: filter.nippos},
                                    {id_kriteria_penilaian: 1}
                                ]
                            },
                            data:{
                                skor: nilaibumn.avg_skor,
                                berlaku_mulai: nilaibumn.Berlaku_Mulai,
                                berlaku_hingga: nilaibumn.Berlaku_Hingga
                            }
                        })
                        return nilai
                    })
             );

    res.status(200).json({ masukNilaiPerformance, masukNilaiLA, masukNilaiakhlak, masukNilaibumn});
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
