import prisma from "../../prisma/prisma";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/loginadmin", async (req, res) => {
  const username = req.body.nippos;
  const password = req.body.password;
  
  try {
    const user = await prisma.karyawan.findUnique({
      where: {
        nippos: username
      },
      include:{
        nipposrole: 
        {
          select:{
            roleid:{
              select:{
                nama_role: true
              }
            }
          }
        }
      }
    });

    const userRole = await prisma.role_Karyawan.findMany({
      where:{
        nippos:username
      },
      select:{
        nipposkaryawan:true,
        roleid:{select:{nama_role:true}}
      }
    })

    if (!user || user.password !== password) {
      // Jika user tidak ditemukan atau password salah
      return res.status(401).json({ message: "Username or password is incorrect" });
    }

    // Jika username dan password cocok, buat token JWT
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token });
  } catch (error) {
    // Tangani kesalahan lain yang mungkin terjadi saat mengakses database
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
