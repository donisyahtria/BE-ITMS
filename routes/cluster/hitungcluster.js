import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updateskorcluster", async (req, res) => {
  try {
    const nilai_capacity = await prisma.$queryRaw`
SELECT 
    nippos,
    AVG(normalized_score) AS skobot
FROM (
    SELECT 
        nippos,
        tipe_komite_talent,
        id_kriteria_penilaian,
        skor,
        (((skor::float - skor_minimal) / (5 - skor_minimal)) * 5) AS normalized_score,
        skor_minimal
    FROM (
        SELECT 
            tq.nippos,
            et.tipe_komite_talent,
            tq.id_kriteria_penilaian,
            tq.skor,
            ptq.skor_minimal,
            COUNT(*) OVER (PARTITION BY tq.nippos) AS nippos_count
        FROM 
            "Talent_Qualification" tq 
        LEFT JOIN 
            "Event_Talent" et ON tq.eventtalentid = et.id
        LEFT JOIN 
            "Parameter_Talent_Qualification" ptq ON et.tipe_komite_talent = ptq.id_komite_talent AND tq.id_kriteria_penilaian = ptq.id_kriteria_penilaian
        LEFT JOIN 
            "Parameter_Talent_Cluster" ptc ON tq.id_kriteria_penilaian = ptc.id_kriteria_penilaian AND et.tipe_komite_talent = ptc.id_komite_talent 
        WHERE 
            tq.status = true
            and 
            tq.id_kriteria_penilaian != 5
    ) AS subquery
    WHERE 
        nippos_count >= 3
) AS avg_subquery
GROUP BY 
    nippos;
`
console.log(nilai_capacity);
    const masukcapacity = await Promise.all(
      nilai_capacity.map(async (filter) => {
        const mapnilai = await prisma.talent_Cluster.updateMany({
          where: {
            nippos: filter.nippos
          },
          data: {
            Skor_Capacity_Axis: filter.skobot
          }
        })
      }
      )
    )

    const nilai_performance = await prisma.$queryRaw`
select tq.nippos, skor as skobot
from "Talent_Cluster" tq 
left join "Talent_Qualification" et
on tq.nippos = et.nippos
where et.id_kriteria_penilaian = 5
group by tq.nippos, et.skor;`

    const masukNilaiPerformance = await Promise.all(
      nilai_performance.map(async (filter) => {
        const mapnilai = await prisma.talent_Cluster.updateMany({
          where: {
            nippos: filter.nippos
          },
          data: {
            Skor_Performance_Axis: filter.skobot
          }
        })
      }
      )
    )

    const assigncapacity = await prisma.$queryRaw`
UPDATE "Talent_Cluster"  AS t1
SET "Capacity_Axis"  = 
    CASE 
        WHEN t1."Skor_Capacity_Axis"  >= t2."H"  THEN 'H'
        WHEN t1."Skor_Capacity_Axis"  < t2."M"  THEN 'L'
        ELSE 'M'
    END
FROM (
  select * from parameter_batas_sumbu
  where "Axis" = 'Capacity'
)  AS t2;`

    const assignperformance = await prisma.$queryRaw`
UPDATE "Talent_Cluster"  AS t1
SET "Performance_Axis"  = 
    CASE 
        WHEN t1."Skor_Performance_Axis"  >= t2."H"  THEN 'H'
        WHEN t1."Skor_Performance_Axis"  <= t2."M"  THEN 'L'
        ELSE 'M'
    END
FROM 
(select * from parameter_batas_sumbu 
where "Axis" = 'Performance')  AS t2;`

    const matrikskategori = await prisma.$queryRaw`
UPDATE "Talent_Cluster"  AS tc
SET "Id_Matriks_Kategori_Awal"  = mk."Id", "Id_Matriks_Kategori_Akhir"  = mk."Id" 
FROM matriks_kategori  AS mk
WHERE tc."Capacity_Axis"  = mk."Capacity_Axis" 
AND tc."Performance_Axis"  = mk."Performance_Axis";`

    res.status(200).json({ message: "done" });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
