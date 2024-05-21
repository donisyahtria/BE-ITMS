import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/getdatagender", async (req, res) => {
  try {
    const year = parseInt(req.query.year);

    let getdatagender;
    if (year !== 0) {
        getdatagender = await prisma.$queryRaw`
       select k.jenis_kelamin as name, count(k.jenis_kelamin) as value
from talent_pool tp 
left join "Karyawan" k 
on tp.nippos  = k.nippos
where EXTRACT(YEAR FROM tp.dibuat_pada) = ${year}
group by k.jenis_kelamin
order by k.jenis_kelamin
      `;
    } else {
        getdatagender = await prisma.$queryRaw`
        select k.jenis_kelamin as name, count(k.jenis_kelamin) as value
from talent_pool tp 
left join "Karyawan" k 
on tp.nippos  = k.nippos
group by k.jenis_kelamin
order by k.jenis_kelamin
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
