import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getdatatalentjoblevel", async (req, res) => {
  try {
    const getdatatalentjoblevel = await prisma.$queryRaw`
   SELECT 
tp.leveljabatan, count(tp.leveljabatan) 
from talent_pool tp 
left join "Referensi_Rumpun_Jabatan" rrj 
on tp.rumpunjabatan = rrj.kode_rumpun_jabatan
left join matriks_kategori mk 
on tp.id_matriks_kategori = mk."Id"
group by tp.leveljabatan`
//push lagee


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
