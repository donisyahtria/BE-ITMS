import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updatekomiteunit", async (req, res) => {
  try {
    const { nippos, komite_unit } = req.body;
    const eventid = Number(req.query.eventtalentid);
    const permanent = parseInt(req.body.permanent)

    const isPermanent = permanent === 2;


    if (isPermanent) {

      const posisi_atasan = await prisma.karyawan.findFirst({
        where: {
          nippos: komite_unit
        },
        select: {
          kode_jabatan: true,
          kode_bagian: true,
        }
      });

      if (!posisi_atasan) {
        console.log("Invalid komite_unit nippos");
        return res.status(400).json({ message: "Invalid komite_unit nippos" });
      }

      const posisi_bawahan = await prisma.karyawan.findFirst({
        where: {
          nippos: nippos,
        },
        select: {
          kode_jabatan: true,
          kode_bagian: true
        }
      });

      if (!posisi_bawahan) {
        console.log("Invalid nippos");
        return res.status(400).json({ message: "Invalid nippos" });
      }

      const existingRow = await prisma.underperson_Komite_Unit.findFirst({
        where: {
          kode_bagian_atasan: posisi_atasan.kode_bagian,
          kode_jabatan_atasan: posisi_atasan.kode_jabatan,
          kode_bagian_bawahan: posisi_bawahan.kode_bagian,
          kode_jabatan_bawahan: posisi_bawahan.kode_jabatan
        }
      });

      if (!existingRow) {
        const maxIdResult = await prisma.underperson_Komite_Unit.aggregate({
          _max: {
            id: true,
          },
        });

        const maxId = maxIdResult._max.id || 0; // Default to 0 if there are no rows
        const newId = maxId + 1;

        await prisma.underperson_Komite_Unit.create({
          data: {
            id: newId,
            kode_bagian_atasan: posisi_atasan.kode_bagian,
            kode_jabatan_atasan: posisi_atasan.kode_jabatan,
            kode_bagian_bawahan: posisi_bawahan.kode_bagian,
            kode_jabatan_bawahan: posisi_bawahan.kode_jabatan
          }
        });

        console.log("New row created in underperson_Komite_Unit");
      }
    } else {
      console.log("Permanent flag is false, skipping underperson_Komite_Unit update");
    }

    const updatekomiteunit = await prisma.kandidat_Talent_dan_Source.updateMany({
      where: {
        eventtalentid: eventid,
        nippos: nippos
      },
      data: {
        komite_unit: komite_unit
      }
    });

    console.log("Komite unit updated");

    res.status(200).json("done");
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

export default router;
