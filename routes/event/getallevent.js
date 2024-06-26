import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getallevent", async (req, res) => {
  try {
    const event = await prisma.event_Talent.findMany({
      orderBy: {
        createdAt: 'desc'
      },
        select:{
            id: true,
            nama_event:true,
            deskripsi: true,
            nippos_ketua_komite: true,
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
            kuota:true,
            jobleve:{
              select:{
                level_jabatan:true
              }
            },
            deadline:{
              select:{
                startdate_1:true,
                eventselesai:true
              }
            }
        }
    });
    res.status(200).json({ event });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
