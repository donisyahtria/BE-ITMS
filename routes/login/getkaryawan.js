import prisma from "../../prisma/prisma";
import express from "express";
import jwt from "jsonwebtoken"
import isAuthenticated from "../../middleware/isAuth";

const router = express.Router();

router.get("/getkaryawan", isAuthenticated, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({decoded});
  });

  export default router;