import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatekomiteunit", async (req, res) => {
  try {
    const nippos      = req.body.nippos
    const eventid     = Number(req.query.eventtalentid)
    const komite_unit = req.body.komite_unit
    const permanent   = req.body.permanent

    console.log(permanent);

    if(permanent){
      const posisi_atasan = await prisma.karyawan.findFirst({
        where:{
          nippos: komite_unit
        },
        select:{
          kode_jabatan: true,
          kode_bagian: true,
        }
      })

      const posisi_bawahan = await prisma.karyawan.findFirst({
        where:{
          nippos: nippos, 
        },
        select:{
          kode_jabatan:true,
          kode_bagian: true
        }
      })

      const existingRow = await prisma.underperson_Komite_Unit.findFirst({
        where:{
          kode_bagian_atasan: posisi_atasan.kode_bagian,
          kode_jabatan_atasan: posisi_atasan.kode_jabatan,
          kode_bagian_bawahan: posisi_bawahan.kode_bagian,
          kode_jabatan_bawahan: posisi_bawahan.kode_jabatan
        }
      })

      if (!existingRow) {
        const maxIdResult = await prisma.underperson_Komite_Unit.aggregate({
            _max: {
                id: true,
            },
        });
        
        const maxId = maxIdResult._max.id || 0; // Default to 0 if there are no rows
        const newId = maxId + 1;
    
        const updateunderperson = await prisma.underperson_Komite_Unit.create({
            data: {
                id: newId,
                kode_bagian_atasan: posisi_atasan.kode_bagian,
                kode_jabatan_atasan: posisi_atasan.kode_jabatan,
                kode_bagian_bawahan: posisi_bawahan.kode_bagian,
                kode_jabatan_bawahan: posisi_bawahan.kode_jabatan
            }
        })
      }
    }

    const updatekomiteunit = await prisma.kandidat_Talent_dan_Source.updateMany({
        where:{
            eventtalentid: eventid,
            nippos: nippos
        },
        data:{
            komite_unit: komite_unit
        }
    })

    res.status(200).json("done");
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

export default router;