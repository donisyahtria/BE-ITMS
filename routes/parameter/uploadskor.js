import { PrismaClient, Prisma } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/addskor", async (req, res) => {
  const dataIncoming = req.body.data;
  const kategori = parseInt(req.body.kategori)

  const dataArray = dataIncoming.filter(data => data.nippos !== "");

  const groupedData = dataArray.reduce((acc, data) => {
    if (!acc[data.nippos]) {
      acc[data.nippos] = {
        nippos: data.nippos,
        totalSkor: 0,
        count: 0,
        Berlaku_Mulai: new Date(data.Berlaku_Mulai),
        Berlaku_Hingga: new Date(data.Berlaku_Hingga),
      };
    }
    acc[data.nippos].totalSkor += parseFloat(data.skor);
    acc[data.nippos].count += 1;
    return acc;
  }, {});

  const avgSkorData = Object.values(groupedData).map(group => ({
    nippos: group.nippos,
    avgSkor: group.totalSkor / group.count,
    Berlaku_Mulai: group.Berlaku_Mulai,
    Berlaku_Hingga: group.Berlaku_Hingga,
  }));

  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input data format or empty array" });
  }

  try {
    switch (kategori) {
      case 1:
        for (const data of avgSkorData) {
          const existingRow = await prisma.skor_BUMN.findFirst({
            where: {
              nippos: data.nippos,
            },
          });

          if (existingRow) {
            await prisma.skor_BUMN.updateMany({
              where: {
                nippos: data.nippos,
              },
              data: {
                avg_skor: data.avgSkor,
                Berlaku_Mulai: data.Berlaku_Mulai,
                Berlaku_Hingga: data.Berlaku_Hingga,
              },
            });
          } else {
            await prisma.skor_BUMN.create({
              data: {
                nippos: data.nippos,
                avg_skor: data.avgSkor,
                Berlaku_Mulai: data.Berlaku_Mulai,
                Berlaku_Hingga: data.Berlaku_Hingga,
              },
            });
          }
        }
        break;
      case 2:
        for (const data of dataArray) {
          const idKompetensi = await prisma.referensi_Kompetensi_Leadership.findFirst({
            where: {
              kodeassessment: data.kodeassessment,
            },
          });

          const existingRow = await prisma.skor_Leadership.findFirst({
            where: {
              nippos: data.nippos,
              id_Kompetensi: idKompetensi.id,
            },
          });

          if (existingRow) {
            await prisma.skor_Leadership.updateMany({
              where: {
                nippos: data.nippos,
                id_Kompetensi: idKompetensi.id,
              },
              data: {
                skor: parseFloat(data.skor),
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
              },
            });
          } else {
            await prisma.skor_Leadership.create({
              data: {
                nippos: data.nippos,
                skor: parseFloat(data.skor),
                id_Kompetensi: idKompetensi.id,
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
              },
            });
          }
        }
        break;
      case 3:
        for (const data of dataArray) {
          const existingRow = await prisma.skor_Technical.findFirst({
            where: {
              nippos: data.nippos,
              id_Kompetensi: parseInt(data.id_Kompetensi),
              id_jenis_kompetensi: parseInt(data.id_jenis_kompetensi)
            },
          });

          if (existingRow) {
            await prisma.skor_Technical.updateMany({
              where: {
                nippos: data.nippos,
                id_Kompetensi: parseInt(data.id_Kompetensi),
                id_jenis_kompetensi: parseInt(data.id_jenis_kompetensi)
              },
              data: {
                skor: parseFloat(data.skor),
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
              },
            });
          } else {
            await prisma.skor_Technical.create({
              data: {
                nippos: data.nippos,
                id_Kompetensi: parseInt(data.id_Kompetensi),
                id_jenis_kompetensi: parseInt(data.id_jenis_kompetensi),
                skor: parseFloat(data.skor),
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
              },
            });
          }
        }
        break;
      case 4:
        for (const data of avgSkorData) {
          const existingRow = await prisma.skor_Potensi.findFirst({
            where: {
              nippos: data.nippos,
            },
          });

          if (existingRow) {
            await prisma.skor_Potensi.updateMany({
              where: {
                nippos: data.nippos,
              },
              data: {
                skor: data.avgSkor,
                Berlaku_Mulai: data.Berlaku_Mulai,
                Berlaku_Hingga: data.Berlaku_Hingga,
              },
            });
          } else {
            await prisma.skor_Potensi.create({
              data: {
                nippos: data.nippos,
                skor: data.avgSkor,
                Berlaku_Mulai: data.Berlaku_Mulai,
                Berlaku_Hingga: data.Berlaku_Hingga,
              },
            });
          }
        }
        break;
      case 5:
        for (const data of dataArray) {
          console.log(data);
          const existingRow = await prisma.skor_AKHLAK.findFirst({
            where: {
              nippos: data.nippos,
            },
          });

          if (existingRow) {
            await prisma.skor_AKHLAK.updateMany({
              where: {
                nippos: data.nippos,
              },
              data: {
                skor: parseFloat(data.skor),
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
              },
            });
          } else {
            await prisma.skor_AKHLAK.create({
              data: {
                nippos: data.nippos,
                skor: parseFloat(data.skor),
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
              },
            });
          }
        }
        break;
      case 6:
        for (const data of dataArray) {
          const existingRow = await prisma.skor_LA.findFirst({
            where: {
              nippos: data.nippos,
            },
          });

          if (existingRow) {
            await prisma.skor_LA.updateMany({
              where: {
                nippos: data.nippos,
              },
              data: {
                skor: parseFloat(data.skor),
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
              },
            });
          } else {
            await prisma.skor_LA.create({
              data: {
                nippos: data.nippos,
                skor: parseFloat(data.skor),
                Berlaku_Mulai: new Date(data.Berlaku_Mulai),
                Berlaku_Hingga: new Date(data.Berlaku_Hingga),
              },
            });
          }
        }
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid kategori value" });
    }

    res.status(200).json({ message: "True" });
  } catch (error) {
    console.error("Error details:", error);

    let missingNippos;
    let missingKodeAssessment;
    let findKompetensiId;
    let missingIdKompetensiTechnical;
    let missingJenisKompetensiTechnical;

    for (const data of dataArray) {
      const existingNippos = await prisma.karyawan.findFirst({
        where: {
          nippos: data.nippos,
        },
      })

      if (!existingNippos) {
        missingNippos = data.nippos;
        break;
      }

      findKompetensiId = await prisma.referensi_Kompetensi_Leadership.findFirst({
        where: {
          kodeassessment: data.kodeassessment,
        },
      });;    

      if (!findKompetensiId) {
        missingKodeAssessment = data.kodeassessment;
        break;
      }

      const existingIdKompetensiTechnical = await prisma.referensi_Kompetensi_Technical.findFirst({
        where: {
          id: parseInt(data.id_Kompetensi)
        }
      })
      
      if (!existingIdKompetensiTechnical) {
        missingIdKompetensiTechnical = parseInt(data.id_Kompetensi)
        break;
      }

      const existingJenisKompetensiTechnical = await prisma.jenis_Kompetensi.findFirst({
        where: {
          id: parseInt(data.id_jenis_kompetensi)
        }
      })
      
      if (!existingJenisKompetensiTechnical) {
        missingJenisKompetensiTechnical = parseInt(data.id_jenis_kompetensi)
        break;
      }
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        if (error.meta.field_name === 'skor_BUMN_nippos_fkey (index)' ||
          error.meta.field_name === 'Skor_Leadership_nippos_fkey (index)' ||
          error.meta.field_name === 'Skor_Technical_nippos_fkey (index)' ||
          error.meta.field_name === 'skor_Potensi_nippos_fkey (index)' ||
          error.meta.field_name === 'skor_AKHLAK_nippos_fkey (index)' ||
          error.meta.field_name === 'skor_LA_nippos_fkey (index)'
        ) {
          res.status(400).send({ error: `Nippos ${missingNippos} tidak terdaftar di data karyawan` });
        } else if (error.meta.field_name === 'Skor_Technical_id_Kompetensi_fkey (index)') {
          res.status(400).send({ error: `id_Kompetensi ${missingIdKompetensiTechnical} tidak terdaftar di referensi kompetensi technical` });
        } else if (error.meta.field_name === 'Skor_Technical_id_jenis_kompetensi_fkey (index)') {
          res.status(400).send({ error: `id_jenis_kompetensi ${missingJenisKompetensiTechnical} tidak terdaftar di referensi jenis kompetensi` });
        } else {
          res.status(500).send({ error: 'An unexpected error occurred' });
        }
      } else {
        res.status(500).send({ error: 'An unexpected error occurred' });
      }
    } else if (error.message.split('\n')[0] === "Cannot read properties of null (reading 'id')" && (!findKompetensiId)) {
      res.status(400).send({ error: `Assessment Code ${missingKodeAssessment} tidak ditemukan di referensi kompetensi Leadership` });
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      const errorMessage = error.message.split(': ')[7];
      if (errorMessage === 'Provided Date object is invalid. Expected Date.') {
        const errorInfo = 'Provided Date object is invalid. Expected Date Format: YYYY-MM-DD'
        res.status(400).json({ error: errorInfo });
      } else {
        res.status(400).json({ error: 'An unexpected error occurred' });
      }
    } else {
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
});

export default router;