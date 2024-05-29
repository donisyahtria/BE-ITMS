import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updateskor", async (req, res) => {
    try {
        const ambilNippos = await prisma.talent_Qualification.findMany({
            distinct: ['nippos']
        });

        // Fetch average skor from prisma.skor_Performance grouped by nippos
        const avgNilaiPerformance = await prisma.skor_Performance.groupBy({
            by: ['nippos'],
            _avg: {
                skor: true,
            },
        });

        const masukNilaiPerformance = await Promise.all(
            avgNilaiPerformance.map(async (filter) => {
                const skor = filter._avg.skor ?? 0;
                return await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 5 }
                        ]
                    },
                    data: {
                        skor,
                        // Set these to suitable date values as needed
                        berlaku_mulai: new Date(), 
                        berlaku_hingga: new Date()
                    }
                });
            })
        );

        const masukNilaiLA = await Promise.all(
            ambilNippos.map(async (filter) => {
                const nilaiLA = await prisma.skor_LA.findFirst({
                    where: { nippos: filter.nippos }
                });
                if (!nilaiLA) return null;
                const skor = nilaiLA.skor ?? 0;
                return await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 7 }
                        ]
                    },
                    data: {
                        skor,
                        berlaku_mulai: nilaiLA.Berlaku_Mulai,
                        berlaku_hingga: nilaiLA.Berlaku_Hingga
                    }
                });
            })
        );

        const masukNilaiakhlak = await Promise.all(
            ambilNippos.map(async (filter) => {
                const nilaiakhlak = await prisma.skor_AKHLAK.findFirst({
                    where: { nippos: filter.nippos }
                });
                if (!nilaiakhlak) return null;
                const skor = nilaiakhlak.skor ?? 0;
                return await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 6 }
                        ]
                    },
                    data: {
                        skor,
                        berlaku_mulai: nilaiakhlak.Berlaku_Mulai,
                        berlaku_hingga: nilaiakhlak.Berlaku_Hingga
                    }
                });
            })
        );

        const nilaibumn = await prisma.$queryRaw`
            SELECT sb.nippos, sb.avg_skor
            FROM "skor_BUMN" sb
            RIGHT JOIN "Talent_Qualification" tq
            ON sb.nippos = tq.nippos
            WHERE sb.nippos IS NOT NULL
            GROUP BY sb.nippos, sb.avg_skor`;

        const masukNilaiPotensi = await Promise.all(
            ambilNippos.map(async (filter) => {
                const nilaipotensi = await prisma.skor_Potensi.findFirst({
                    where: { nippos: filter.nippos }
                });
                if (!nilaipotensi) return null;
                const skor = nilaipotensi.skor ?? 0;
                return await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 4 }
                        ]
                    },
                    data: {
                        skor,
                        berlaku_mulai: nilaipotensi.Berlaku_Mulai,
                        berlaku_hingga: nilaipotensi.Berlaku_Hingga
                    }
                });
            })
        );

        const masukNilaibumn = await Promise.all(
            nilaibumn.map(async (filter) => {
                const skor = filter.avg_skor ?? 0;
                return await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos: filter.nippos },
                            { id_kriteria_penilaian: 1 }
                        ]
                    },
                    data: {
                        skor,
                        berlaku_mulai: new Date(),
                        berlaku_hingga: new Date()
                    }
                });
            })
        );

        const nilaileadership = await prisma.$queryRaw`
            SELECT sl.nippos, AVG(sl.skor) AS avg_skor
            FROM "Skor_Leadership" sl
            RIGHT JOIN "Talent_Qualification" tq
            ON sl.nippos = tq.nippos
            GROUP BY sl.nippos`;

        const masukNilaileader = await Promise.all(
            nilaileadership.map(async (filter) => {
                const nippos = filter.nippos;
                if (!nippos) return null;
                const skor = filter.avg_skor ?? 0;
                return await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos },
                            { id_kriteria_penilaian: 2 }
                        ]
                    },
                    data: {
                        skor,
                        berlaku_mulai: new Date(),
                        berlaku_hingga: new Date()
                    }
                });
            })
        );

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
                (AVG(scaled_score) * 5) AS skor,
                MAX("Berlaku_Mulai") AS berlaku_mulai,
                MAX("Berlaku_Hingga") AS berlaku_hingga
            FROM ranked_scores
            WHERE rn <= 5
            GROUP BY nippos;`;

        const masukNilaitechnical = await Promise.all(
            nilaitechnical.map(async (filter) => {
                const nippos = filter.nippos;
                if (!nippos) return null;
                const skor = filter.skor ?? 0;
                return await prisma.talent_Qualification.updateMany({
                    where: {
                        AND: [
                            { nippos },
                            { id_kriteria_penilaian: 3 }
                        ]
                    },
                    data: {
                        skor,
                        berlaku_mulai: filter.berlaku_mulai,
                        berlaku_hingga: filter.berlaku_hingga
                    }
                });
            })
        );

        res.status(200).json({ message: "done" });
    } catch (err) {
        console.log({ err });
        res.status(500).json({ message: "Internal server error", err });
    }
});

export default router;
