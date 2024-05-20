import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getdatatalentjoblevel", async (req, res) => {
  try {
    const year = parseInt(req.query.year);

    let getdatatalentjoblevel;
    if (year !== 0) {
      getdatatalentjoblevel = await prisma.$queryRaw`
        SELECT 
          tp.leveljabatan, 
          COUNT(tp.leveljabatan) AS count
        FROM 
          talent_pool tp 
        LEFT JOIN 
          "Referensi_Rumpun_Jabatan" rrj ON tp.rumpunjabatan = rrj.kode_rumpun_jabatan
        LEFT JOIN 
          matriks_kategori mk ON tp.id_matriks_kategori = mk."Id"
        WHERE 
          EXTRACT(YEAR FROM tp.dibuat_pada) = ${year}
        GROUP BY 
          tp.leveljabatan;
      `;
    } else {
      getdatatalentjoblevel = await prisma.$queryRaw`
        SELECT 
          tp.leveljabatan, 
          COUNT(tp.leveljabatan) AS count
        FROM 
          talent_pool tp 
        LEFT JOIN 
          "Referensi_Rumpun_Jabatan" rrj ON tp.rumpunjabatan = rrj.kode_rumpun_jabatan
        LEFT JOIN 
          matriks_kategori mk ON tp.id_matriks_kategori = mk."Id"
        GROUP BY 
          tp.leveljabatan;
      `;
    }

    const formattedData = getdatatalentjoblevel.map(row => ({
      ...row,
      count: row.count.toString()
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
