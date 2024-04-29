import prisma from "../../prisma/prisma";
import express from "express";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/loginadmin", async (req, res) => {
    const username = req.body.nippos;
    const password = req.body.password
    const user = await prisma.karyawan.findUnique({
      where: {
        nippos: username,
      }
    });
  
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token});
  });

  export default router;