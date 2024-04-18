import express from "express";
import prisma from "../../prisma/prisma";

const router = express.Router();

router.post("/comparenilai", async (req, res) => {
  try {
    const ambilNippos = await prisma.talent_Qualification.findMany({
      distinct: ['nippos']
    })

    const kkmbumn = await prisma.parameter_Talent_Qualification.findFirst({ //ambil kkm bumn
      where: {
        AND: [
          { id_komite_talent: 1 },
          { id_kriteria_penilaian: 1 }
        ]
      }
    })

    const kkmperformance = await prisma.parameter_Talent_Qualification.findFirst({ //ambil kkm performance
      where: {
        AND: [
          { id_komite_talent: 1 },
          { id_kriteria_penilaian: 5 }
        ]
      }
    })

    const kkmakhlak = await prisma.parameter_Talent_Qualification.findFirst({ //ambil kkm akhlak
      where: {
        AND: [
          { id_komite_talent: 1 },
          { id_kriteria_penilaian: 6 }
        ]
      }
    })

    const kkmla = await prisma.parameter_Talent_Qualification.findFirst({ //ambil kkm learningagility
      where: {
        AND: [
          { id_komite_talent: 1 },
          { id_kriteria_penilaian: 7 }
        ]
      }
    })

    async function lulusbumn(nilai) { //ambil karyawan yang lolos bumn
      const users = await prisma.talent_Qualification.findMany({
        where: {
          id_kriteria_penilaian: 1,
          skor: {
            gte: nilai // Get users with age greater than the specified value
          }
        }
      });
      // console.log(users);
      return users
    }

    async function lulusperformance(nilai) { //ambil karyawan yang lolos performnace
      const users = await prisma.talent_Qualification.findMany({
        where: {
          id_kriteria_penilaian: 5,
          skor: {
            gte: nilai // Get users with age greater than the specified value
          }
        }
      });
      // console.log(users);
      return users
    }

    async function lulusakhlak(nilai) { //ambil karyawan yang lolos akhlak
      const users = await prisma.talent_Qualification.findMany({
        where: {
          id_kriteria_penilaian: 6,
          skor: {
            gte: nilai // Get users with age greater than the specified value
          }
        }
      });
      // console.log(users);
      return users
    }

    async function lulusla(nilai) { //ambil karyawan yang lolos learning agility
      const users = await prisma.talent_Qualification.findMany({
        where: {
          id_kriteria_penilaian: 7,
          skor: {
            gte: nilai // Get users with age greater than the specified value
          }
        }
      });
      // console.log(users);
      return users
    }

    // list nama yang lulus masing masing skor
    const lulus_bumn = await lulusbumn(kkmbumn.skor_minimal);
    const lulus_performance = await lulusperformance(kkmperformance.skor_minimal);
    const lulus_akhlak = await lulusakhlak(kkmakhlak.skor_minimal);
    const lulus_la = await lulusla(kkmla.skor_minimal);

    lulus_bumn.map(async (lulus) => (
      await prisma.talent_Qualification.updateMany({
        where: {
          AND: [
            { nippos: lulus.nippos },
            { id_kriteria_penilaian: 1 }
          ]
        },
        data: {
          status: true
        }
      })
    ))

    lulus_performance.map(async (lulus) => (
      await prisma.talent_Qualification.updateMany({
        where: {
          AND: [
            { nippos: lulus.nippos },
            { id_kriteria_penilaian: 5 }
          ]
        },
        data: {
          status: true
        }
      })
    ))

    lulus_akhlak.map(async (lulus) => (
      await prisma.talent_Qualification.updateMany({
        where: {
          AND: [
            { nippos: lulus.nippos },
            { id_kriteria_penilaian: 6 }
          ]
        },
        data: {
          status: true
        }
      })
    ))

    lulus_la.map(async (lulus) => (
      await prisma.talent_Qualification.updateMany({
        where: {
          AND: [
            { nippos: lulus.nippos },
            { id_kriteria_penilaian: 7 }
          ]
        },
        data: {
          status: true
        }
      })
    ))


    // const comparebumn = await Promise.all(
    //     ambilNippos.map(async (nippos) => {
    //         const nilaibumn = await prisma.talent_Qualification.findFirst({
    //             where:{
    //                 AND:[
    //                     {nippos: nippos.nippos},
    //                     {id_kriteria_penilaian: 1}
    //                 ]
    //             },
    //             select:{
    //                 skor:true
    //             }
    //         })
    //         nilaibumn.map(async (bumn) =>{
    //             const gantistatus = await prisma.talent_Qualification.updateMany({
    //                 where:{
    //                     AND:[
    //                         {nippos: nippos.nippos},
    //                         {id_kriteria_penilaian}
    //                     ]
    //                 }

    //                 }
    //             )
    //         })}))

    res.status(200).json({ message: "done" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
})

export default router;