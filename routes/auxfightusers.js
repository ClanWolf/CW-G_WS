const { logger } = require("../logger.js");
const db = require("../db.js");
const AuxFightUser = require("../models/AuxFightUser");

const express = require("express");
const router = express.Router();

const TABLE_NAME = "aux_fightusers";
const PRIMARY_KEY_COLUMN = "aux_fightuser_id";

function serializeInsertResult(result) {
  return {
    affectedRows: Number(result.affectedRows || 0),
    insertId: result.insertId ? result.insertId.toString() : null,
  };
}

async function getWritableColumns() {
  const columns = await db.pool.query(`SHOW COLUMNS FROM ${TABLE_NAME}`);

  return columns
    .filter((column) => !String(column.Extra || "").includes("auto_increment"))
    .map((column) => column.Field);
}

router.get("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  try {
    const fightUsers = await db.pool.query(`SELECT * FROM ${TABLE_NAME}`);
    const auxFightUsers = fightUsers.map((fu) => new AuxFightUser(fu));
    logger.info("List of all auxfightuser records requested from ip: " + ip);

    res.status(200).send(auxFightUsers);
  } catch (err) {
    logger.error("Failed to load auxfightuser records: " + err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  try {
    const fightUsers = await db.pool.query(
      `SELECT * FROM ${TABLE_NAME} WHERE \`${PRIMARY_KEY_COLUMN}\` = ? LIMIT 1`,
      [req.params.id]
    );

    logger.info(
      "Auxfightuser record with id " + req.params.id + " requested from ip: " + ip
    );

    fightUsers.length > 0
      ? res.status(200).json(new AuxFightUser(fightUsers[0]))
      : res.sendStatus(404);
  } catch (err) {
    logger.error("Failed to load auxfightuser record: " + err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const payload = req.body || {};

  try {
    if (Array.isArray(payload) || typeof payload !== "object") {
      return res.status(400).json({ message: "Request body must be an object" });
    }

    const writableColumns = await getWritableColumns();
    const requestColumns = Object.keys(payload);
    const unknownColumns = requestColumns.filter(
      (key) => !writableColumns.includes(key)
    );

    if (unknownColumns.length > 0) {
      return res.status(400).json({
        message: "Unknown or read-only auxfightuser fields provided",
        fields: unknownColumns,
      });
    }

    const payloadColumns = requestColumns.filter((key) =>
      writableColumns.includes(key)
    );

    if (payloadColumns.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid auxfightuser fields provided" });
    }

    const columns = payloadColumns.map((column) => `\`${column}\``).join(", ");
    const placeholders = payloadColumns.map(() => "?").join(", ");
    const values = payloadColumns.map((column) => payload[column]);

    const result = await db.pool.query(
      `INSERT INTO ${TABLE_NAME} (${columns}) VALUES (${placeholders})`,
      values
    );

    logger.info("Auxfightuser record created from ip: " + ip);

    res.status(201).json(serializeInsertResult(result));
  } catch (err) {
    logger.error("Failed to create auxfightuser record: " + err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
