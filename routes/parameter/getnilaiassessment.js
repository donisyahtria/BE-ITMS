import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getnilaiassessment", async (req, res) => {
  try {
    const resultObject = await prisma.$queryRaw`
select distinct 
	k.nama as "nama",
	k.nippos as "nippos",
	COALESCE(cast(concat(rj.nama_jabatan, ' ', rb.nama_bagian) as text), '-') as "posisi",
	COALESCE(cast(k.job_level as text), '-') as "joblevel", 
	COALESCE(cast(rrj.nama_rumpun_jabatan as text), '-') as "rumpunjabatan", 
	COALESCE(cast(rk.nama_kantor as text), '-') as "kantor",
	COALESCE(cast(k2.nama as text), '-') as "komiteunit",
	COALESCE(cast(ROUND(CAST(sb.avg_skor as numeric), 2) as text), '-') as "kompbumn",
	COALESCE(cast(leadership.avg_leadership as text), '-') as "komplead",
	COALESCE(cast(kt.skor as text), '-') as "kompteknis",
	COALESCE(cast(ROUND(CAST(sp.skor as numeric), 2) as text), '-') as "potensi",
	COALESCE(cast(sa.skor as text), '-') as "akhlak",
	COALESCE(cast(sl.skor as text), '-') as "learningagility",
	COALESCE(cast(pms1.skor as text), '-') as "PMS2yearsago",
	COALESCE(cast(pms2.skor as text), '-') as "PMS1yearago",
	COALESCE(cast(pms3.skor as text), '-') as "PMSthisyear"
from "Karyawan" k 
left join "Referensi_Jabatan" rj on rj.id = k.kode_jabatan
left join "Referensi_Bagian" rb on rb.id = k.kode_bagian
left join "Referensi_Rumpun_Jabatan" rrj on rrj.kode_rumpun_jabatan = k.rumpun_jabatan
left join "Referensi_Kantor" rk on rk.nopend = k.kode_nopend
left join "skor_BUMN" sb ON k.nippos = sb.nippos 
left join (
	SELECT 
	    nippos,
	    ROUND(CAST(AVG(skor) AS numeric), 2) AS avg_leadership
	FROM "Skor_Leadership" sl 
	GROUP BY nippos
) as leadership on k.nippos =  leadership.nippos
left join "skor_Potensi" sp on k.nippos = sp.nippos 
left join "skor_AKHLAK" sa ON k.nippos = sa.nippos
left join "skor_LA" sl on k.nippos = sl.nippos
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
left join (
	SELECT 
	    rs.nippos,
	    ROUND(cast(AVG(rs.scaled_score) * 5 as numeric), 2) AS skor,
	    MAX(rs."Berlaku_Mulai") AS berlaku_mulai,
	    MAX(rs."Berlaku_Hingga") AS berlaku_hingga
	FROM (
	    SELECT DISTINCT
	        k.nippos,
	        k.rumpun_jabatan,
	        komp.id_kompetensi_technical,
	        CASE 
	            WHEN t.skor / komp."Advanced" > 1 THEN 1
	            ELSE t.skor / komp."Advanced"
	        END AS scaled_score,
	        t."Berlaku_Mulai",
	        t."Berlaku_Hingga",
	        ROW_NUMBER() OVER (
	            PARTITION BY k.nippos 
	            ORDER BY t."Berlaku_Mulai" DESC, 
	                     (t.skor / komp."Advanced") DESC
	        ) AS rn
	    FROM "Karyawan" AS k
	    LEFT JOIN "Kompetensi_Hardsoft_Rumpun" AS komp
	        ON komp.kode_rumpun_jabatan = k.rumpun_jabatan
	    LEFT JOIN "Skor_Technical" AS t
	        ON t.nippos = k.nippos
	       AND t."id_Kompetensi" = komp."id_kompetensi_technical"
	    WHERE t.skor IS NOT null
	) AS rs
	WHERE rs.rn <= 5
	GROUP BY rs.nippos
) as kt on k.nippos = kt.nippos
left join (
	SELECT 
	    uku.kode_jabatan_bawahan, 
	    uku.kode_bagian_bawahan,
	    uku.kode_jabatan_atasan,
	    uku.kode_bagian_atasan
	FROM 
	    "Underperson_Komite_Unit" uku
	WHERE 
	    (uku.kode_jabatan_bawahan, uku.kode_bagian_bawahan) IN (
	        SELECT 
	            kode_jabatan_bawahan, 
	            kode_bagian_bawahan
	        FROM 
	            "Underperson_Komite_Unit"
	        GROUP BY 
	            kode_jabatan_bawahan, 
	            kode_bagian_bawahan
	        HAVING 
	            COUNT(*) = 1
	    )
	ORDER BY 
	    uku.kode_jabatan_bawahan, 
	    uku.kode_bagian_bawahan
) as ku on k.kode_jabatan = ku.kode_jabatan_bawahan
		and k.kode_bagian = ku.kode_bagian_bawahan
left join "Karyawan" k2 
	on k2.kode_jabatan = ku.kode_jabatan_atasan
	and k2.kode_bagian = ku.kode_bagian_atasan
	and k.kode_nopend = k2.kode_nopend
order by k.nama;
    `

    res.status(200).json(resultObject);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
