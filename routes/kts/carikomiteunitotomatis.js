import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/cariotomatis", async (req, res) => {
  try {

    const ambilNippos = await prisma.kandidat_Talent_dan_Source.findMany({
        select: {
            relasiNippos:{
                select:{
                    kode_bagian:true,
                    kode_jabatan:true,
                    kode_nopend: true
                }
            }
        }
    })

    let atasan = await Promise.all(
        ambilNippos.map( async (data) => {
            const cariAtasan = await prisma.karyawan.findMany({
              where: {
                    jabatan: {
                        jabatas: {
                        some: {
                            kode_jabatan_bawahan: data.relasiNippos.kode_jabatan,
                            },
                        },
                    },
                    bagian: {
                        bagatas: {
                        some: {
                            kode_bagian_bawahan: data.relasiNippos.kode_bagian,
                        },
                        },
                    },
                    kode_nopend: data.relasiNippos.kode_nopend
                },
            });
            return cariAtasan
        }) 
    ) 

    const finalData = [].concat(...atasan);

    res.status(200).json(finalData);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
