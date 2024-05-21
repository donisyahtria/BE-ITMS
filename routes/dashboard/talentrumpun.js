import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getdatatalentrumpun", async (req, res) => {
  try {
    const year = parseInt(req.query.year)

    let getdatatalentrumpun;
    if (year == 0) {
      getdatatalentrumpun = await prisma.$queryRaw`
    SELECT 
    (CASE 
        WHEN rrj.nama_rumpun_jabatan = 'Operasi' THEN 'OP'
        WHEN rrj.nama_rumpun_jabatan = 'Bisnis' THEN 'B'
        WHEN rrj.nama_rumpun_jabatan = 'Perencanaan dan Pengelolaan Strategis' THEN 'PP'
        WHEN rrj.nama_rumpun_jabatan = 'Manajemen Risiko dan Kepatuhan' THEN 'MR'
        WHEN rrj.nama_rumpun_jabatan = 'Pengelolaan Regulasi' THEN 'PR'
        WHEN rrj.nama_rumpun_jabatan = 'Pengelolaan Teknologi' THEN 'TI'
        WHEN rrj.nama_rumpun_jabatan = 'Keuangan' THEN 'KU'
        WHEN rrj.nama_rumpun_jabatan = 'Sumber Daya Manusia' THEN 'SDM'
    END) AS nama_rumpun_jabatan,
    mk."Nama_Matriks_Kategori", 
    COUNT(tp.id_matriks_kategori) 
FROM 
    talent_pool tp 
LEFT JOIN 
    "Referensi_Rumpun_Jabatan" rrj ON tp.rumpunjabatan = rrj.kode_rumpun_jabatan
LEFT JOIN 
    matriks_kategori mk ON tp.id_matriks_kategori = mk."Id"
GROUP BY 
    rrj.nama_rumpun_jabatan, 
    mk."Nama_Matriks_Kategori"
ORDER BY
    nama_rumpun_jabatan, "Nama_Matriks_Kategori" 
      `;
    } else {
      getdatatalentrumpun = await prisma.$queryRaw`
    SELECT 
    (CASE 
        WHEN rrj.nama_rumpun_jabatan = 'Operasi' THEN 'OP'
        WHEN rrj.nama_rumpun_jabatan = 'Bisnis' THEN 'B'
        WHEN rrj.nama_rumpun_jabatan = 'Perencanaan dan Pengelolaan Strategis' THEN 'POP'
        WHEN rrj.nama_rumpun_jabatan = 'Manajemen Risiko dan Kepatuhan' THEN 'MR'
        WHEN rrj.nama_rumpun_jabatan = 'Pengelolaan Regulasi' THEN 'PR'
        WHEN rrj.nama_rumpun_jabatan = 'Pengelolaan Teknologi' THEN 'TI'
        WHEN rrj.nama_rumpun_jabatan = 'Keuangan' THEN 'KU'
        WHEN rrj.nama_rumpun_jabatan = 'Sumber Daya Manusia' THEN 'SDM'
    END) AS nama_rumpun_jabatan,
    mk."Nama_Matriks_Kategori", 
    COUNT(tp.id_matriks_kategori) 
FROM 
    talent_pool tp 
LEFT JOIN 
    "Referensi_Rumpun_Jabatan" rrj ON tp.rumpunjabatan = rrj.kode_rumpun_jabatan
LEFT JOIN 
    matriks_kategori mk ON tp.id_matriks_kategori = mk."Id"
WHERE
    EXTRACT(YEAR FROM tp.dibuat_pada) = ${year}
GROUP BY 
    rrj.nama_rumpun_jabatan, 
    mk."Nama_Matriks_Kategori"
ORDER BY
    nama_rumpun_jabatan, "Nama_Matriks_Kategori" 
      `;
    }

//push lagee


const formattedData = getdatatalentrumpun.map(row => ({
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
