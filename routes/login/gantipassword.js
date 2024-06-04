import prisma from "../../prisma/prisma";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/gantipassword", async (req, res) => {
  const { nippos, passwordLama, passwordBaru } = req.body;

  try {
    const karyawan = await prisma.karyawan.findUnique({
      where: { nippos }
    });

    if (!karyawan) {
      return res.status(404).json({ message: "NIPPOS tidak ditemukan" });
    }

    const isPasswordMatch = await bcrypt.compare(passwordLama, karyawan.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password lama tidak sesuai" });
    }

    const hashedPassword = await bcrypt.hash(passwordBaru, 10);

    const gantiPassword = await prisma.karyawan.update({
      where: { nippos },
      data: { password: hashedPassword }
    });

    res.status(200).json({ message: "Password berhasil diubah", gantiPassword });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
