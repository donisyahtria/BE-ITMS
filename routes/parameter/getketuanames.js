import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getNamaKetuaKomiteTalent", async (req, res) => {
  try {
    const ketuaKT1 = await prisma.$queryRaw`
      select initcap(nama) as namaketua, initcap(nama_jabatan) as jabatan, nama_bagian 
      from "Komite_Talent" kt 
      left join "Karyawan" k 
        on kt.kode_jabatan = k.kode_jabatan
        and kt.kode_bagian = k.kode_bagian 
      left join "Referensi_Jabatan" rj 
        on kt.kode_jabatan = rj.id
      left join "Referensi_Bagian" rb 
        on kt.kode_bagian = rb.id 
      where kt.posisi_komite_talent = 'Ketua'
      and kt.id_komite_talent = 1
    `;
    const ketuaKT2 = await prisma.$queryRaw`
      select initcap(nama) as namaketua, initcap(nama_jabatan) as jabatan, nama_bagian 
      from "Komite_Talent" kt 
      left join "Karyawan" k 
        on kt.kode_jabatan = k.kode_jabatan
        and kt.kode_bagian = k.kode_bagian 
      left join "Referensi_Jabatan" rj 
        on kt.kode_jabatan = rj.id
      left join "Referensi_Bagian" rb 
        on kt.kode_bagian = rb.id 
      where kt.posisi_komite_talent = 'Ketua'
      and kt.id_komite_talent = 2
    `;
    const ketuaKT3 = await prisma.$queryRaw`
      select initcap(nama) as namaketua, initcap(nama_jabatan) as jabatan, nama_bagian 
      from "Komite_Talent" kt 
      left join "Karyawan" k 
        on kt.kode_jabatan = k.kode_jabatan
        and kt.kode_bagian = k.kode_bagian 
      left join "Referensi_Jabatan" rj 
        on kt.kode_jabatan = rj.id
      left join "Referensi_Bagian" rb 
        on kt.kode_bagian = rb.id 
      where kt.posisi_komite_talent = 'Ketua'
      and kt.id_komite_talent = 3
    `;

    res.status(200).json({
      ketuaKT1: ketuaKT1[0],
      ketuaKT2: ketuaKT2[0],
      ketuaKT3: ketuaKT3[0]
    });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
