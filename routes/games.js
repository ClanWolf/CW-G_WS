const { logger } = require("../logger.js");
const db = require("../db.js");

const express = require("express");
const router = express.Router();

const SECRET_KEY = require("../secret");
const verifyToken = require("../auth");

const Game = require("../models/Game");

router.get("/", async (req, res) => {
  //router.get("/", verifyToken, async (req, res) => {

  try {
    var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    const games = await db.pool.query("SELECT * FROM asc_game");
    logger.info("List of all games requested from ip: " + ip);

    res.status(200).send(games);
  } catch (err) {
    throw err;
  }
});

router.get("/sb", async (req, res) => {
	//router.get("/", verifyToken, async (req, res) => {

	try {
		var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
		const games = await db.pool.query("SELECT * FROM asc_game where showInScoreboard = 1");
		logger.info("List of all games for ScoreBoard requested from ip: " + ip);

		res.status(200).send(games);
	} catch (err) {
		throw err;
	}
});

/* router.get("/:id", async (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const games = await db.pool.query("SELECT * FROM asc_game");
  logger.info("Game with id " + req.params.id + " requested from ip: " + ip);

  let game = games.find(function (item) {
    return item.gameid == req.params.id;
  });

  game ? res.status(200).json(game) : res.sendStatus(404);
}); */

router.get("/:id", async (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const games = await db.pool.query(
    "SELECT " +
      "g.gameid, " +
      "g.ownerPlayerId, " +
      "g.title, " +
      "g.background, " +
      "g.era, " +
      "g.yearInGame, " +
      "g.accessCode, " +
      "g.locked, " +
      "g.scheduled, " +
      "g.started, " +
      "g.finished, " +
      "p.playerid, " +
      "p.npc, " +
      "p.login_enabled, " +
      "p.name, " +
      "p.password, " +
      "p.password_god, " +
      "p.password_phoenix, " +
      "p.admin, " +
      "p.godadmin, " +
      "p.image, " +
      "p.factionid, " +
      "p.hostedgameid, " +
      //      "p.gameid, " +
      "p.teamid, " +
      "p.commandid, " +
      "p.opfor, " +
      "p.bid_pv, " +
      "p.bid_tonnage, " +
      "p.bid_winner, " +
      "p.round, " +
      "p.active_ingame, " +
      "p.last_unit_opened, " +
      "p.last_login " +
      "FROM asc_game g JOIN asc_player p ON g.gameid = p.gameid WHERE g.gameid = ?",
    [req.params.id]
  );
  /*   const players = await db.pool.query(
      "SELECT p.* FROM asc_player p WHERE p.gameId = ?",
      [req.params.id]
    ); */

  logger.info("Game with id " + req.params.id + " requested from ip: " + ip);

  let game = games.find(function (item) {
    return item.gameid == req.params.id;
  });

  game ? res.status(200).json(game) : res.sendStatus(404);
});

router.get("/:id/light", async (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  // with ` its possible to create multi line comments/string
  try {
    const rows = await db.pool.query(
      `  SELECT *, 
        asc_player.name as playerName
                     FROM asc_game
                              LEFT JOIN asc_player
                                        ON asc_game.gameid = asc_player.gameid
                              LEFT JOIN asc_assign
                                        ON asc_player.playerid = asc_assign.playerid
                              LEFT JOIN asc_unit
                                        ON asc_assign.unitid = asc_unit.unitid
                              LEFT JOIN asc_formation
                                        ON asc_assign.formationid  = asc_formation.formationid
                              LEFT JOIN asc_unitstatus
                                        ON asc_unit.unitid = asc_unitstatus.unitid
                                            AND asc_game.gameid = asc_unitstatus.gameid
                                            AND asc_player.round = asc_unitstatus.round
                              LEFT JOIN asc_pilot
                                        ON asc_assign.pilotid = asc_pilot.pilotid
                              LEFT JOIN asc_faction
                                        ON asc_faction.factionid = asc_player.factionid
                              LEFT JOIN asc_command
                                        ON asc_command.commandid = asc_player.commandid
                     WHERE asc_game.gameid = ?;`,
      [req.params.id]
    );

    // Convert the response into a usable object
    const game = Game.parseFromRows(rows);

    if (!game) return res.status(404).json({ message: "Game not found" });

    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    ownerPlayerId,
    title,
    background,
    era,
    yearInGame,
    accessCode,
    locked,
    scheduled,
    started,
    finished,
  } = req.body;
  const games = await db.pool.query("SELECT * FROM asc_game");
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  let game = {
    gameid: games.length + 1,
    ownerPlayerId: ownerPlayerId,
    title: title,
    background: background,
    era: era,
    yearInGame: yearInGame,
    accessCode: accessCode,
    locked: locked,
    scheduled: scheduled,
    started: started,
    finished: finished !== undefined ? finished : null,
    createdAt: new Date(),
  };

  /*   db.pool.query(
      "INSERT INTO asc_game VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      Object.values(game)
    ); */

  //logger.info("Game with id " + game.gameid + " created from ip: " + ip);
  logger.info("NOT CREATING ANYTHING! CHECK CODE!");

  res.status(201).json(game);
});

router.put("/:id", async (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const games = await db.pool.query("SELECT * FROM asc_game");

  let game = games.find(function (item) {
    return item.gameid == req.params.id;
  });

  if (game) {
    var con = "";
    var updateQueryString = "UPDATE asc_game SET ";
    var data = req.body;
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string" || value instanceof String) {
        updateQueryString = updateQueryString + con + `${key}='${value}'` + " ";
      } else {
        updateQueryString = updateQueryString + con + `${key}=${value}` + " ";
      }
      if (con == "") {
        con = ",";
      }
    }
    updateQueryString = updateQueryString + " WHERE gameid=" + game.gameid;

    /*     db.pool.query(updateQueryString, (error, result) => {
          if (error) throw error;
          logger.info("Game with id " + game.gameid + " updated from ip: " + ip);
        }); */

    //logger.info(updateQueryString);
    //logger.info("Game with id " + game.gameid + " updated from ip: " + ip);
    logger.info("NOT UPDATING ANYTHING! CHECK CODE!");

    res.sendStatus(204).json(game);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", async (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const games = await db.pool.query("SELECT * FROM asc_game");

  let game = games.find(function (item) {
    return item.gameid == req.params.id;
  });

  if (game) {
    /*     db.pool.query(
          "DELETE FROM asc_game WHERE gameid = ?",
          [game.gameid],
          (error, result) => {
            if (error) throw error;
            logger.info("Game with id " + game.gameid + " deleted from ip: " + ip);
          }
        ); */

    //logger.info(updateQueryString);
    //logger.info("Game: " + game.gameid);
    logger.info("NOT DELETING ANYTHING! CHECK CODE!");
  } else {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

module.exports = router;
