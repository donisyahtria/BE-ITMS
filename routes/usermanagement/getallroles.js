import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getallroles", async (req, res) => {
  try {
    const details = await prisma.$queryRaw`
        SELECT 
            k.nama AS nama, 
            k.nippos AS nippos, 
            rrj.nama_rumpun_jabatan AS jobfam,
            CONCAT(rj.nama_jabatan, ' ', rb.nama_bagian) AS posisi, 
            k.job_level AS joblevel,
            COALESCE(cast(role_aggregated.peran as text), '-') AS "Peran"
        FROM 
            "Karyawan" k 
        LEFT JOIN 
            "Referensi_Bagian" rb ON k.kode_bagian = rb.id 
        LEFT JOIN 
            "Referensi_Jabatan" rj ON k.kode_jabatan = rj.id 
        LEFT JOIN 
            "Referensi_Rumpun_Jabatan" rrj ON k.rumpun_jabatan = rrj.kode_rumpun_jabatan 
        LEFT JOIN (
            SELECT 
                rk.nippos, 
                STRING_AGG(DISTINCT ru.nama_role, ', ') AS peran
            FROM (
                SELECT DISTINCT 
                    nippos, 
                    role_id
                FROM 
                    "Role_Karyawan"
            ) AS rk
            LEFT JOIN 
                "Role_User" ru ON rk.role_id = ru.id
            GROUP BY 
                rk.nippos
        ) AS role_aggregated ON k.nippos = role_aggregated.nippos;
    `;

    res.status(200).json(details);
  } catch (err) {
    console.error({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
