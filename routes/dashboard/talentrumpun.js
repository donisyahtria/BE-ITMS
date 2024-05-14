import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getdatatalentrumpun", async (req, res) => {
  try {
    const getdatatalentrumpun = await prisma.$queryRaw`
    SELECT 
(case 
	when rrj.nama_rumpun_jabatan = 'Operasi' then 'OP'
	when rrj.nama_rumpun_jabatan = 'Bisnis' then 'B'
	when rrj.nama_rumpun_jabatan = 'Perencanaan dan Pengelolaan Strategis' then 'POP'
	when rrj.nama_rumpun_jabatan = 'Manajemen Risiko dan Kepatuhan' then 'MR'
	when rrj.nama_rumpun_jabatan = 'Pengelolaan Regulasi' then 'PR'
	when rrj.nama_rumpun_jabatan = 'Pengelolaan Teknologi' then 'TI'
	when rrj.nama_rumpun_jabatan = 'Keuangan' then 'KU'
	when rrj.nama_rumpun_jabatan = 'Sumber Daya Manusia' then 'SDM'
end) as nama_rumpun_jabatan,
mk."Nama_Matriks_Kategori", count(tp.id_matriks_kategori) 
from talent_pool tp 
left join "Referensi_Rumpun_Jabatan" rrj 
on tp.rumpunjabatan = rrj.kode_rumpun_jabatan
left join matriks_kategori mk 
on tp.id_matriks_kategori = mk."Id"
group by rrj.nama_rumpun_jabatan, mk."Nama_Matriks_Kategori"`

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
