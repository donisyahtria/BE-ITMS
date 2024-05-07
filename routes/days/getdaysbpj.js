import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/gettablebpjdays", async (req, res) => {
  try {
    const eventid = parseInt(req.query.eventtalentid)
    const detail = await prisma.$queryRaw`
   select 
k.nama,
dbe.nippos as "nippos",
concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi"
from daftar_bpj_event dbe
join  "Karyawan" k ON dbe.nippos = k.nippos 
left join "Referensi_Jabatan" rj on k.kode_jabatan = rj.id
left join "Referensi_Bagian" rb on k.kode_bagian = rb.id
where dbe.eventtalentid = ${eventid}
`
    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
