import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/getrole", async (req, res) => {
    try {
        const nippos = String(req.body.nippos);
        const roles = await prisma.role_Karyawan.findMany({
            where: {
                nippos: nippos
            },
            select: {
                role_id: true
            }
        });

        const roleIds = roles.map(role => role.role_id);

        const namaroles = await prisma.role_User.findMany({
            where: {
                id: {
                    in: roleIds
                }
            }
        });

        res.status(200).json({ message: "Success", namaroles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
