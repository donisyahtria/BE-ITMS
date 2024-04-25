import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.get("/gettable", async (req, res) => {
    try {
        const tabeltalent = await prisma.$queryRaw`
        `

      res.status(200).json({tabeltalent})
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Internal server error", err });
      
    }
});

export default router;