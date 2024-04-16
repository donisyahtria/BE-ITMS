import prisma from "../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/addevent", async (req, res) => {
    try {
        const addevent = await prisma.event_Talent.create({
            data: {
                nama_event: req.body.nama_event,
                tipekomite: { connect: { id: parseInt(req.body.tipe_komite) } },
                nipposketua: { connect: { nippos: req.body.nippos_ketua } },
                rumpun: {connect:{kode_rumpun_jabatan: parseInt(req.body.kode_rumpun_jabatan)}},
                kuota: parseInt(req.body.kuota),
                deskripsi: req.body.deskripsi,
                tanggal_mulai: new Date(req.body.tanggal_mulai),
                tanggal_selesai: new Date(req.body.tanggal_selesai),
                eventstatus: {connect : {id : 1}},
                createdAt: new Date(),
                createdBy: "Admin",
            },
        });

        console.log("eventid:",addevent.id);

        const level_jabatan = req.body.level_jabatan;
        const addjoblvleventPromises = level_jabatan.map(async (level) => {
            await prisma.job_Level_Event.create({
                data: {
                    eventid: addevent.id,
                    level_jabatan: level
                },
            });
        });

        const id_pertanyaan = req.body.id_pertanyaan;
        const addpertanyaanevent = id_pertanyaan.map(async (idquest) => {
            await prisma.event_Pertanyaan.create({
                data: {
                    eventid: addevent.id,
                    id_pertanyaan: idquest
                },
            });
        });

        const nippos = req.body.nippos;
        const komitetalentevent = nippos.map(async (nip) => {
            await prisma.komite_Talent_Event.create({
                data: {
                    eventid: addevent.id,
                    nippos: nip
                },
            });
        });

        await Promise.all(addjoblvleventPromises, addpertanyaanevent, komitetalentevent);

        res.status(200).json({ addevent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
