import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/createqualificationquery", async (req, res) => {
    try {
        const event_id = parseInt(req.body.eventtalentid)
        const lolosprofile = await prisma.$queryRaw`
            SELECT 
                tp.nippos,
                tp.eventtalentid,
                k.tipe_jabatan,
                c.id_kriteria_penilaian,
                tp.komite_unit
            FROM 
                "Talent_Profile" tp
            join "Karyawan" k
            on tp.nippos = k.nippos
            join "Event_Talent" et 
            on tp.eventtalentid = et.id 
            JOIN 
                "Kriteria_Penilaian" c ON 
                (et.tipe_komite_talent = 1 and c.id_kriteria_penilaian in (1,5,6,7, 8) or
                (et.tipe_komite_talent = 2 and
                (
                    (k.tipe_jabatan = 1 AND c.id_kriteria_penilaian  IN (2, 5, 6, 7, 8)) OR
                    (k.tipe_jabatan = 2 AND c.id_kriteria_penilaian  IN (3, 5, 6, 7, 8))
                    )
                    ) or 
                (et.tipe_komite_talent = 3 and c.id_kriteria_penilaian in (4,5,6,7, 8))
                )
            where tp.pakta_integritas =true and tp.commitmenletter =true
            and tp.eventtalentid =${event_id} 
            ORDER BY 
                tp.nippos , c.id_kriteria_penilaian ;`
        
        let hasil=[]
        for (const row of lolosprofile) {
            const eventId = row.eventtalentid;
            // Check if the event_id exists in the insertedEventIds table
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
                        eventtalentid: row.eventtalentid,
                        id_kriteria_penilaian: row.id_kriteria_penilaian,
                        skor: 0,
                        berlaku_mulai: null,
                        berlaku_hingga: null,
                        status: false,
                        komite_unit: row.komite_unit,
                        createdAt: new Date(),
                    }
                })
                hasil.push(masukqual)
                // const masukqual = await Promise.all(
                //     lolosprofile.map(async (filter) => {
                //         const loopmasukqual = await prisma.talent_Qualification.createMany({
                //             data: {
                //                 nippos: filter.nippos,
                //                 eventtalentid: filter.eventtalentid,
                //                 id_kriteria_penilaian: filter.id_kriteria_penilaian,
                //                 skor: 0,
                //                 berlaku_mulai: null,
                //                 berlaku_hingga: null,
                //                 status: false,
                //                 komite_unit: filter.komite_unit,
                //                 createdAt: new Date(),
                //             },
                //         });
                //         return loopmasukqual
                //     })
                // );
            }

        }
        res.status(200).json(hasil);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
});

export default router;
