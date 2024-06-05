import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkaryawanevent", async (req, res) => {
  try {
    const nippos = req.query.nippos
    console.log(nippos);
    const eventperkomite = await prisma.talent_Profile.findMany({
      select:{
        eventtalentid: true
      },
      where:{
        nippos: nippos,
      }
    })

    const eventIds = eventperkomite.map(event => event.eventtalentid);


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
            evenstatus_id: true,
            profile:{
              where:{
                nippos: nippos
              },
              select:{
                pakta_integritas: true,
                commitmenletter: true
              }
            }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

    res.status(200).json({event});
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
