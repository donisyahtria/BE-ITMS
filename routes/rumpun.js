import prisma from "../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    const { kode, nama} = req.body;

    const rumpun = await prisma.t_Rumpun_Jabatan.create({
        data: {id : kode, nama_rumpun_jabatan : nama}
    })

    res.status(200).json({rumpun});
})

export default router;