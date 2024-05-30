import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createqualificationtable", async (req, res) => {
    try {
        const event_id = parseInt(req.body.eventtalentid)
        console.log('event_id: ', event_id);
        const lolosprofile = await prisma.$queryRaw`
        select 
            tp.nippos,
            temp.id_kriteria_penilaian,
            COALESCE(scores.skor, 0) as skor,
            scores.berlaku_mulai,
            scores.berlaku_hingga,
            tp.eventtalentid,
            tp.komite_unit, 
            case when COALESCE(scores.skor, 0) >= temp.skor_minimal then true else false end as status
        from "Talent_Profile" tp 
        left join "Karyawan" k 
            on tp.nippos = k.nippos 
        left join "Event_Talent" et 
            on tp.eventtalentid = et.id 
        left join (
            select 
                distinct(ptq.id_komite_talent), 
                8 as id_kriteria_penilaian, 
                null::integer as skor_minimal,
                1 as tipe_jabatan
            from "Parameter_Talent_Qualification" ptq
            union all
            select 
                distinct(ptq.id_komite_talent), 
                8 as id_kriteria_penilaian, 
                null::integer as skor_minimal,
                2 as tipe_jabatan
            from "Parameter_Talent_Qualification" ptq
            union all
            select 
                ptq.id_komite_talent, 
                ptq.id_kriteria_penilaian, 
                ptq.skor_minimal,
                case 
                    when ptq.id_komite_talent = 2 and ptq.id_kriteria_penilaian = 2 then 1
                    when ptq.id_komite_talent = 2 and ptq.id_kriteria_penilaian = 3 then 2
                    else 1
                end as tipe_jabatan
            from "Parameter_Talent_Qualification" ptq 
            where (ptq.id_komite_talent != 2 or ptq.id_kriteria_penilaian not in (2, 3))
            or (ptq.id_komite_talent = 2 and ptq.id_kriteria_penilaian in (2, 3))
            union all 
            select 
                ptq.id_komite_talent, 
                ptq.id_kriteria_penilaian, 
                ptq.skor_minimal,
                2 AS tipe_jabatan
            from "Parameter_Talent_Qualification" ptq 
            where (ptq.id_komite_talent != 2 or ptq.id_kriteria_penilaian not in (2, 3))
        ) as temp on et.tipe_komite_talent = temp.id_komite_talent
            and k.tipe_jabatan = temp.tipe_jabatan
        left join (
            -- (1) Kompetensi BUMN
            select 
                1 as id_kriteria_penilaian, 
                sb.nippos,
                round(cast(sb.avg_skor as numeric), 2) as skor,
                sb."Berlaku_Mulai" as berlaku_mulai,
                sb."Berlaku_Hingga" as berlaku_hingga
            from "skor_BUMN" sb 
            -- (2) Kompetensi Leadership
            union
            select 
                2 as id_kriteria_penilaian, 
                sl.nippos,
                round(cast(avg(sl.skor) as numeric), 2) as skor,
                max(sl."Berlaku_Mulai") as berlaku_mulai,
                max(sl."Berlaku_Hingga") as berlaku_hingga
            from "Skor_Leadership" sl 
            group by sl.nippos
            -- (3) Kompetensi Teknis
            union
            SELECT 
                3 as id_kriteria_penilaian, 
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
            -- (4) Potensi
            union
            select 
                4 as id_kriteria_penilaian, 
                sp.nippos,
                round(cast(sp.skor as numeric), 2) as skor,
                sp."Berlaku_Mulai" as berlaku_mulai,
                sp."Berlaku_Hingga" as berlaku_hingga
            from "skor_Potensi" sp 
            -- (5) Performance
            union
            select 
                5 as id_kriteria_penilaian, 
                pms.nippos,
                round(cast(avg(pms.skor) as numeric), 2) as skor,
                cast(concat(min(pms.tahun), '-01-01') as date) as berlaku_mulai,
                cast(concat(max(pms.tahun), '-01-01') as date) as berlaku_hingga
            from "Skor_Performance" pms
            group by pms.nippos
            -- (6) AKHLAK
            union
            select 
                6 as id_kriteria_penilaian, 
                sa.nippos,
                sa.skor,
                sa."Berlaku_Mulai" as berlaku_mulai,
                sa."Berlaku_Hingga" as berlaku_hingga
            from "skor_AKHLAK" sa 
            -- (7) Learning Agility
            union
            select
                7 as id_kriteria_penilaian, 
                sl.nippos,
                sl.skor,
                sl."Berlaku_Mulai" as berlaku_mulai,
                sl."Berlaku_Hingga" as berlaku_hingga
            from "skor_LA" sl
        ) as scores on tp.nippos = scores.nippos
            and temp.id_kriteria_penilaian = scores.id_kriteria_penilaian
        where tp.pakta_integritas = true 
            and tp.commitmenletter = true
            and tp.eventtalentid = ${event_id}
        order by tp.nippos, temp.id_kriteria_penilaian;
        `
        
        let hasil=[]
        for (const row of lolosprofile) {
            const eventId = row.eventtalentid;
            const existingRow = await prisma.talent_Qualification.findFirst({
                where: {
                    eventtalentid: eventId,
                    nippos: row.nippos,
                    id_kriteria_penilaian: row.id_kriteria_penilaian
                }
            });
        
            if (!existingRow) {
                const masukqual = await prisma.talent_Qualification.create({
                    data:{
                        nippos: row.nippos,
                        id_kriteria_penilaian: row.id_kriteria_penilaian,
                        skor: row.skor,
                        berlaku_mulai: row.berlaku_mulai,
                        berlaku_hingga: row.berlaku_hingga,
                        createdAt: new Date(),
                        eventtalentid: row.eventtalentid,
                        komite_unit: row.komite_unit,
                        status: row.status
                    }
                })
                hasil.push(masukqual)
            }

        }
        res.status(200).json(hasil);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
});

export default router;
