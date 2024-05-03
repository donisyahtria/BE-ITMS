import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/gettablebpjdays", async (req, res) => {
  try {
    const eventid = parseInt(req.query.eventtalentid)
    const detail = await prisma.$queryRaw`
    select 
k.nama,
et.nippos_ketua_komite as "nippos",
concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi",
1 as sort_order
from "Event_Talent" et
join  "Karyawan" k ON et.nippos_ketua_komite = k.nippos 
left join "Referensi_Jabatan" rj on k.kode_jabatan = rj.id
left join "Referensi_Bagian" rb on k.kode_bagian = rb.id
where et.id = ${eventid}
union
select 
k.nama,
kte.nippos,
concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi",
2 as sort_order
from "Komite_Talent_Event" kte
join "Karyawan" k ON kte.nippos = k.nippos 
left join "Referensi_Jabatan" rj on k.kode_jabatan = rj.id
left join "Referensi_Bagian" rb on k.kode_bagian = rb.id
where eventid = ${eventid}
union 
select distinct 
k.nama,
td.komite_unit as "nippos",
concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi",
3 as sort_order
from "Talent_Days" td
join "Karyawan" k ON td.komite_unit = k.nippos 
left join "Referensi_Jabatan" rj on k.kode_jabatan = rj.id
left join "Referensi_Bagian" rb on k.kode_bagian = rb.id
where td.eventtalentid =${eventid}
order by sort_order asc;`
    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
