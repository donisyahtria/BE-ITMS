import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updateskorcluster", async (req, res) => {
  try {
    const nilai_capacity = await prisma.$queryRaw`
select nippos, sum((skor*bobot)) as skobot
from "Talent_Qualification" tq 
left join "Event_Talent" et
on tq.eventtalentid = et.id
left join "Parameter_Talent_Cluster" ptc 
on tq.id_kriteria_penilaian = ptc.id_kriteria_penilaian and et.tipe_komite_talent = ptc.id_komite_talent 
where bobot is not null
and tq.status = true 
group by nippos
having count(*)=3;`

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
        WHEN t1."Skor_Capacity_Axis"  <= t2."L"  THEN 'L'
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
        WHEN t1."Skor_Performance_Axis"  <= t2."L"  THEN 'L'
        ELSE 'M'
    END
FROM 
(select * from parameter_batas_sumbu 
where "Axis" = 'Performance')  AS t2;`

    const matrikskategori = await prisma.$queryRaw`
UPDATE "Talent_Cluster"  AS tc
SET "Id_Matriks_Kategori_Awal"  = mk."Id" 
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