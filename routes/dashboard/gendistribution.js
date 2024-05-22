import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getgendistribution", async (req, res) => {
  try {
    const year = parseInt(req.query.year);

    let getdatagender;
    if (year !== 0) {
        getdatagender = await prisma.$queryRaw`
 SELECT 
    CASE 
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) >= 1997 THEN 'Gen Z'
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) <= 1980 THEN 'Gen X'
        ELSE 'Gen Y'
    END AS name,
    COUNT(*) AS value
FROM talent_pool tp
left join "Karyawan" k 
on tp.nippos = k.nippos
where EXTRACT(YEAR FROM tp.dibuat_pada) = ${year} 
GROUP BY 
    CASE 
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) >= 1997 THEN 'Gen Z'
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) <= 1980 THEN 'Gen X'
        ELSE 'Gen Y'
    END
ORDER BY
CASE 
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) >= 1997 THEN 'Gen Z'
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) <= 1980 THEN 'Gen X'
        ELSE 'Gen Y'
    END
`;
    } else {
        getdatagender = await prisma.$queryRaw`
 SELECT 
    CASE 
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) >= 1997 THEN 'Gen Z'
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) <= 1980 THEN 'Gen X'
        ELSE 'Gen Y'
    END AS name,
    COUNT(*) AS value
FROM talent_pool tp
left join "Karyawan" k 
on tp.nippos = k.nippos
GROUP BY 
    CASE 
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) >= 1997 THEN 'Gen Z'
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) <= 1980 THEN 'Gen X'
        ELSE 'Gen Y'
    END
    ORDER BY
CASE 
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) >= 1997 THEN 'Gen Z'
        WHEN EXTRACT(YEAR FROM k.tanggal_lahir) <= 1980 THEN 'Gen X'
        ELSE 'Gen Y'
    END;
`;
    }


    const formattedData = getdatagender.map(row => ({
        ...row,
        value: row.value.toString()
      }));
      
    res.status(200).json(formattedData);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
