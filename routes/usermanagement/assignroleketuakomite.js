import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/assignroleketuakomite", async (req, res) => {
    try {
        const nip = req.body.nippos;
    
        // Check if there are any records with the current nip and role_id equal to 4
        const existingRecord = await prisma.role_Karyawan.findFirst({
          where: {
            nippos: nip,
            role_id: 5
          }
        });
    
        // If no existing record found, create new record
        if (!existingRecord) {
          await prisma.role_Karyawan.create({
            data: {
              nippos: nip,
              role_id: 5
            }
          });
        }

    res.status(200).json("done");
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
