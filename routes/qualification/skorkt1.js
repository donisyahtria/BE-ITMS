import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updateskor", async (req, res) => {
    try {

        const ambilNippos = await prisma.talent_Qualification.findMany({
            distinct: ['nippos']
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
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 5 }
                        ]
                    },
                    data: {
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
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 7 }
                        ]
                    },
                    data: {
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
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 6 }
                        ]
                    },
                    data: {
                        skor: nilaiakhlak.skor,
                        berlaku_mulai: nilaiakhlak.Berlaku_Mulai,
                        berlaku_hingga: nilaiakhlak.Berlaku_Hingga
                    }
                })
                return nilai
            })
        );

        const nilaibumn = await prisma.$queryRaw`
             SELECT sb.nippos, sb.avg_skor
             FROM "skor_BUMN" sb
             RIGHT JOIN "Talent_Qualification" tq
             on sb.nippos = tq.nippos
             WHERE sb.nippos is not null
             GROUP BY sb.nippos, sb.avg_skor`
            ;

            const masukNilaiPotensi = await Promise.all(
                ambilNippos.map(async (filter) => {
                    const nilaipotensi = await prisma.skor_Potensi.findFirst({
                        where: {
                            nippos: filter.nippos,
                        }
                    });
                    const nilai = await prisma.talent_Qualification.updateMany({
                        where: {
                            AND: [
                                { nippos: filter.nippos },
                                { id_kriteria_penilaian: 4 }
                            ]
                        },
                        data: {
                            skor: nilaipotensi.skor,
                            berlaku_mulai: nilaipotensi.Berlaku_Mulai,
                            berlaku_hingga: nilaipotensi.Berlaku_Hingga
                        }
                    })
                    return nilai
                })
            );

        const masukNilaibumn = await Promise.all(
            nilaibumn.map(async (filter) => (
                await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 1 }
                        ]
                    },
                    data: {
                        skor: filter.avg_skor,
                        berlaku_mulai: new Date(),
                        berlaku_hingga: new Date()
                    }
                }
                )
            )
            )
        )

        const nilaileadership = await prisma.$queryRaw`
             SELECT sl.nippos, avg(sl.skor) as avg_skor
             FROM "Skor_Leadership" sl
             RIGHT JOIN "Talent_Qualification" tq
             on sl.nippos = tq.nippos
             GROUP BY sl.nippos`
            ;

        const masukNilaileader = await Promise.all(
            nilaileadership.map(async (filter) => (
                await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 2 }
                        ]
                    },
                    data: {
                        skor: filter.avg_skor,
                        berlaku_mulai: new Date(),
                        berlaku_hingga: new Date()
                    }
                }
                )
            )
            )
        )

        const nilaitechnical = await prisma.$queryRaw`
        WITH pre_talent_qualification AS (
        SELECT 
                nippos,
                eventtalentid,
                komite_unit,
                '2024-04-30' AS CreatedAt
        FROM "Talent_Profile" tp 
        WHERE pakta_integritas=true
                AND commitmenletter=true 
),

ranked_scores AS (
        SELECT DISTINCT
                tq.nippos,
                tq.eventtalentid,
                tq.komite_unit,
                tq.createdat,
                k.rumpun_jabatan,
                komp.id_kompetensi_technical,
                CASE 
                        WHEN t.skor / komp."Advanced" > 1 THEN 1
                        ELSE t.skor / komp."Advanced"
                END AS scaled_score,
                t."Berlaku_Mulai",
                t."Berlaku_Hingga",
                ROW_NUMBER() OVER (
                        PARTITION BY tq.nippos 
                        ORDER BY t."Berlaku_Mulai" DESC, 
                                        (t.skor / komp."Advanced") DESC
                ) AS rn
        FROM pre_talent_qualification AS tq
        LEFT JOIN "Karyawan" AS k
                ON tq.nippos = k.nippos
        LEFT JOIN "Kompetensi_Hardsoft_Rumpun" AS komp
                ON komp.kode_rumpun_jabatan = k.rumpun_jabatan
        LEFT JOIN "Skor_Technical" AS t
                ON t.nippos = tq.nippos
                AND t."id_Kompetensi" = komp."id_kompetensi_technical"
        WHERE t.skor IS NOT NULL
)

SELECT 
        nippos,
        (AVG(scaled_score)*5) AS skor,
        MAX("Berlaku_Mulai") AS berlaku_mulai,
        MAX("Berlaku_Hingga") AS berlaku_hingga
FROM ranked_scores
WHERE rn <= 5
GROUP BY nippos;`
      console.log(nilaitechnical);

const masukNilaitechnical = await Promise.all(
    nilaitechnical.map(async (filter) => (
        await prisma.talent_Qualification.updateMany({
            where: {
                AND: [
                    { nippos: filter.nippos },
                    { id_kriteria_penilaian: 3 }
                ]
            },
            data: {
                skor: filter.skor,
                berlaku_mulai: filter.berlaku_mulai,
                berlaku_hingga: filter.berlaku_hingga
            }
        }
        )
    )
    )
)

        res.status(200).json({ message: "done" });
    } catch (err) {
        console.log({ err });
        res.status(500).json({ message: "Internal server error", err });
    }
});

export default router;

