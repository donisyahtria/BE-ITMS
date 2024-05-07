import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkomiteevent", async (req, res) => {
  try {
    const nippos = "451416105"

    const eventperkomite = await prisma.talent_Cluster.findMany({
      select:{
        eventtalentid: true
      },
      where:{
        ketua_komite_talent: nippos,
      },
      distinct:  ['eventtalentid']
    })

    const eventIds = eventperkomite.map(event => event.eventtalentid);
    console.log(eventIds);

    const event = await prisma.event_Talent.findMany({
        where: {
            id: {
              in: eventIds
            }
          },
        select:{
            id: true,
            nama_event:true,
            deskripsi: true,
            tipekomite:{
                select:{
                    tipe_komite_talent: true
                }
            },
            kode_rumpun_jabatan:true,
            rumpun:{
                select:{
                    nama_rumpun_jabatan: true
                }
            },
            tanggal_mulai: true,
            tanggal_selesai: true,
            evenstatus_id: true
        }
    });

    res.status(200).json({event});
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
