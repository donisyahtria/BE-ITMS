import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getkandidattrue", async (req, res) => {
  try {
    const eventid = Number(req.query.eventtalentid);
    const detail = await prisma.$queryRaw`select k2.nama as "Nama", k2.nippos as "Nippos", concat(rj.nama_jabatan,' ',rb.nama_bagian) as "Posisi", rrj.nama_rumpun_jabatan as "Job Family", k2.job_level as "Job Level", rk.nama_kantor as "Nama Kantor", k3.nama as "Komite Unit"
    from "Kandidat_Talent_dan_Source" k
    join "Karyawan" k2 on k2.nippos = k.nippos 
    left join "Karyawan" k3 on k3.nippos = k.komite_unit
    join "Referensi_Jabatan" rj on rj.id = k2.kode_jabatan
    join "Referensi_Bagian" rb on rb.id = k2.kode_bagian
    join "Referensi_Rumpun_Jabatan" rrj on rrj.id = k2.rumpun_jabatan
    join "Referensi_Kantor" rk on rk.nopend = k2.kode_nopend
    WHERE k.eventtalentid = ${eventid} 
    AND
    k.status_talensource = true;
    `
    //const tabelsourceevent = detail.filter(detail => detail.eventtalentid === eventid);


    res.status(200).json(detail);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
