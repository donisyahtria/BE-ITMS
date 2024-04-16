import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getheadcommit", async (req, res) => {
    const id_komite_talent = parseInt(req.query.id_komite_talent);
    console.log(id_komite_talent);
    try {
      const head = await prisma.karyawan.findMany({
        where:{
          jabatan:{
            komite:{
              some:{
                id_komite_talent:id_komite_talent,
                posisi_komite_talent:'Ketua'
              }
            }
          },
          bagian:{
            komite:{
              some:{
                id_komite_talent:id_komite_talent,
                posisi_komite_talent:'Ketua'
              }
            }
          }
        },
        select:{
          id:true,
          nama:true,
          nippos: true
        }
      })
      res.status(200).json(head)
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Internal server error", err });
      
    }
});

export default router;