import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkomiteevent", async (req, res) => {
  try {
    const nippos = req.query.nippos;

    const eventperkomite = await prisma.talent_Cluster.findMany({
      select: {
        eventtalentid: true
      },
      where: {
        ketua_komite_talent: nippos,
      },
      distinct: ['eventtalentid']
    });

    const parameter = await prisma.parameter_Kuota.findFirst({
      where:{
        id: 2
      },
      select:{
        bobot: true
      }
    })

    const eventIds = eventperkomite.map(event => event.eventtalentid);
    console.log(eventIds);

    const events = await prisma.event_Talent.findMany({
      where: {
        id: {
          in: eventIds
        }
      },
      select: {
        id: true,
        nama_event: true,
        deskripsi: true,
        tipekomite: {
          select: {
            tipe_komite_talent: true
          }
        },
        kode_rumpun_jabatan: true,
        rumpun: {
          select: {
            nama_rumpun_jabatan: true
          }
        },
        tanggal_mulai: true,
        tanggal_selesai: true,
        evenstatus_id: true,
        eventcluster: {
          select: {
            Id_Matriks_Kategori_Awal: true,
            Id_Matriks_Kategori_Akhir: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Process the result to determine the value of some_variable
    const processedEvents = events.map(event => {
      // Count different Id_Matriks_Kategori_Awal and Id_Matriks_Kategori_Akhir
      const totalClusters = event.eventcluster.length;
      const differentCategoriesCount = event.eventcluster.filter(cluster => cluster.Id_Matriks_Kategori_Awal !== cluster.Id_Matriks_Kategori_Akhir).length;

      // Determine the value of some_variable based on the count of different categories
      const statusisi = differentCategoriesCount >= (totalClusters * (parameter.bobot/100));
      console.log("parameter", parameter);

      // Exclude status_talensource from the kandidat
      const { eventcluster, ...eventWithoutEventCluster } = event;

      return {
        ...eventWithoutEventCluster,
        statusisi,
        differentCategoriesCount
      };
    });

    res.status(200).json({ event: processedEvents });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
