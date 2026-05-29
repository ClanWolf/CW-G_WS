const { logger } = require("../logger.js");
const db = require("../db.js");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  try {
    const fights = await db.pool.query("SELECT * FROM c3_PCONFIGHT");
    logger.info("List of all pconfight records requested from ip: " + ip);

    res.status(200).send(fights);
  } catch (err) {
    logger.error("Failed to load pconfight records: " + err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
