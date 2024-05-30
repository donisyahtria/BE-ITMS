import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkandidattrue", async (req, res) => {
  try {
    const eventid = Number(req.query.eventtalentid);
    const nippos  = req.query.nippos
    let detail;
    if (nippos) {
      detail = await prisma.$queryRaw`
          select 
              k2.nama as "Nama", 
              k2.nippos as "Nippos", 
              concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi", 
              rrj.nama_rumpun_jabatan as "Job Family", 
              k2.job_level as "Job Level", 
              rk.nama_kantor as "Nama Kantor", 
              COALESCE(cast(k3.nama as text), '-') as "Komite Unit",
              skor_competency.skor as "Competency/Psychotest",
              pms1.skor as "PMS2yearsago",
              pms2.skor as "PMS1yearago",
              pms3.skor as "PMSthisyear",
              sa.skor as "AKHLAK",
              sl.skor as "Learning Agility",
              case 
                  when k2.status_hukdis = '0' then 'Tidak'
                  else 'Ya'
              end as "Status Hukdis"  
          from "Kandidat_Talent_dan_Source" k
          left join "Karyawan" k2 on k2.nippos = k.nippos 
          left join "Karyawan" k3 on k3.nippos = k.komite_unit
          left join "Referensi_Jabatan" rj on rj.id = k2.kode_jabatan
          left join "Referensi_Bagian" rb on rb.id = k2.kode_bagian
          left join "Referensi_Rumpun_Jabatan" rrj on rrj.kode_rumpun_jabatan  = k2.rumpun_jabatan
          left join "Referensi_Kantor" rk on rk.nopend = k2.kode_nopend
          left join (
              select * 
              from "Skor_Performance"
              where tahun = EXTRACT(YEAR FROM CURRENT_DATE) - 2
                ) as pms1 on k.nippos = pms1.nippos
          left join (
              select * 
              from "Skor_Performance"
              where tahun = EXTRACT(YEAR FROM CURRENT_DATE) - 1
                ) as pms2 on k.nippos = pms2.nippos
          left join (
              select * 
              from "Skor_Performance"
              where tahun = EXTRACT(YEAR FROM CURRENT_DATE)
                ) as pms3 on k.nippos = pms3.nippos
          left join "skor_AKHLAK" sa ON k.nippos = sa.nippos
          left join "skor_LA" sl on k.nippos = sl.nippos
          left join (
            select * from "Parameter_Talent_Qualification" ptq 
            right join (
                select 1 as id_kriteria_penilaian, sb.nippos, round(cast(sb.avg_skor as numeric), 2) as skor
                from "skor_BUMN" sb 
                union
                select 2 as id_kriteria_penilaian, sl.nippos, round(cast(avg(sl.skor) AS numeric), 2) AS skor
                from "Skor_Leadership" sl group by nippos
                union
                select 4 as id_kriteria_penilaian, sp.nippos, round(cast(sp.skor as numeric), 2) as skor
                from "skor_Potensi" sp 
            ) as skor_talent on skor_talent.id_kriteria_penilaian = ptq.id_kriteria_penilaian  
            where ptq.id_komite_talent = (
                select et.tipe_komite_talent 
                from "Event_Talent" et 
                where et.id = ${eventid}
            )
        ) as skor_competency on k.nippos = skor_competency.nippos
          where k.eventtalentid = ${eventid}
          and k.komite_unit = ${nippos}
          AND k.status_talensource = true;
      `;
    } else {
      detail = await prisma.$queryRaw`
          select 
              k2.nama as "Nama", 
              k2.nippos as "Nippos", 
              concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi", 
              rrj.nama_rumpun_jabatan as "Job Family", 
              k2.job_level as "Job Level", 
              rk.nama_kantor as "Nama Kantor", 
              COALESCE(cast(k3.nama as text), '-') as "Komite Unit",
              skor_competency.skor as "Competency/Psychotest",
              pms1.skor as "PMS2yearsago",
              pms2.skor as "PMS1yearago",
              pms3.skor as "PMSthisyear",
              sa.skor as "AKHLAK",
              sl.skor as "Learning Agility",
              case 
                  when k2.status_hukdis = '0' then 'Tidak'
                  else 'Ya'
              end as "Status Hukdis"  
          from "Kandidat_Talent_dan_Source" k
          left join "Karyawan" k2 on k2.nippos = k.nippos 
          left join "Karyawan" k3 on k3.nippos = k.komite_unit
          left join "Referensi_Jabatan" rj on rj.id = k2.kode_jabatan
          left join "Referensi_Bagian" rb on rb.id = k2.kode_bagian
          left join "Referensi_Rumpun_Jabatan" rrj on rrj.kode_rumpun_jabatan  = k2.rumpun_jabatan
          left join "Referensi_Kantor" rk on rk.nopend = k2.kode_nopend
          left join (
        select * 
        from "Skor_Performance"
        where tahun = EXTRACT(YEAR FROM CURRENT_DATE) - 2
          ) as pms1 on k.nippos = pms1.nippos
          left join (
        select * 
        from "Skor_Performance"
        where tahun = EXTRACT(YEAR FROM CURRENT_DATE) - 1
          ) as pms2 on k.nippos = pms2.nippos
          left join (
        select * 
        from "Skor_Performance"
        where tahun = EXTRACT(YEAR FROM CURRENT_DATE)
          ) as pms3 on k.nippos = pms3.nippos
          left join "skor_AKHLAK" sa ON k.nippos = sa.nippos
          left join "skor_LA" sl on k.nippos = sl.nippos
          left join (
            select * from "Parameter_Talent_Qualification" ptq 
            right join (
                select 1 as id_kriteria_penilaian, sb.nippos, round(cast(sb.avg_skor as numeric), 2) as skor
                from "skor_BUMN" sb 
                union
                select 2 as id_kriteria_penilaian, sl.nippos, round(cast(avg(sl.skor) AS numeric), 2) AS skor
                from "Skor_Leadership" sl group by nippos
                union
                select 4 as id_kriteria_penilaian, sp.nippos, round(cast(sp.skor as numeric), 2) as skor
                from "skor_Potensi" sp 
            ) as skor_talent on skor_talent.id_kriteria_penilaian = ptq.id_kriteria_penilaian  
            where ptq.id_komite_talent = (
                select et.tipe_komite_talent 
                from "Event_Talent" et 
                where et.id = ${eventid}
            )
        ) as skor_competency on k.nippos = skor_competency.nippos
          where k.eventtalentid = ${eventid}
          AND k.status_talensource = true;
      `;
    }
    //const tabelsourceevent = detail.filter(detail => detail.eventtalentid === eventid);


    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
