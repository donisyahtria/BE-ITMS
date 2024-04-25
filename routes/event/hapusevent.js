import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.delete("/hapusevent", async (req, res) => {
  try {
    // Delete rows from other tables (A, B, C) based on the provided ID
    await prisma.event_Pertanyaan.deleteMany({
      where: {
        eventid: req.body.eventid, // Adjust the field name accordingly
      },
    });

    await prisma.komite_Talent_Event.deleteMany({
      where: {
        eventid: req.body.eventid, // Adjust the field name accordingly
      },
    });

    await prisma.job_Level_Event.deleteMany({
      where: {
        eventid: req.body.eventid, // Adjust the field name accordingly
      },
    });

    // Delete the main row from tableName
    await prisma.event_Talent.delete({
      where: {
        id: req.body.eventid, // Specify the ID of the row to be deleted
      },
    });

    res.status(200).json({ message: "Event and related data deleted successfully" });
  } catch (err) {
    console.error("Error deleting event and related data:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
