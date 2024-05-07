import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.delete("/hapusbpj", async (req, res) => {
  try {
    // Delete rows from other tables (A, B, C) based on the provided ID
    await prisma.daftar_bpj_event.deleteMany({
      where: {
        eventtalentid: req.body.eventid, // Adjust the field name accordingly
        nippos:req.body.nippos
      },
    });

    res.status(200).json({ message: "Event and related data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event and related data:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
