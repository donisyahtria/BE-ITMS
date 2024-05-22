import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/addskor", async (req, res) => {
  const dataArray = req.body.data; 
  const kategori = parseInt(req.body.kategori)

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
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;