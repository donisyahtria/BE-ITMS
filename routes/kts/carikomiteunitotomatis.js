import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/cariotomatis", async (req, res) => {
  try {
    const eventid = parseInt(req.query.eventtalentid)

    const ambilNippos = await prisma.kandidat_Talent_dan_Source.findMany({
      where:{
      eventtalentid: eventid
      },
        select: {
            id:true,
            nippos:true,
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
            let cariAtasan = await prisma.karyawan.findFirst({
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
            return {
              karyawan : {
                id: data.id,
                nippos: data.nippos
              },
              atasan: cariAtasan
            }
        }) 
    ) 

    const finalData = [].concat(...atasan);

    const masukKomite = await Promise.all(
        finalData.map(async (filter) => {
          if (filter.atasan) {
            await prisma.kandidat_Talent_dan_Source.update({
              where: {
                id: filter.karyawan.id,
              },
              data: {
                relasiKomiteUnit: { connect: { nippos: filter.atasan.nippos } },
              },
            });
          }
        })
      );

    res.status(200).json("Berhasil");
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
