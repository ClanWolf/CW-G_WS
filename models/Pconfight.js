// models/Pconfight.js
class Pconfight {
  constructor(data) {
    this.PCONFIGHT_ID = data.PCONFIGHT_ID;
    this.PCONFIGHT_NAME = data.PCONFIGHT_NAME;
    this.PCONFIGHT_LOCATION = data.PCONFIGHT_LOCATION;
    this.PCONFIGHT_QUIRK = data.PCONFIGHT_QUIRK;
    this.ID_PCONCAMPAIGN = data.ID_PCONCAMPAIGN;
    this.ID_PLAYER_FACTION_A = data.ID_PLAYER_FACTION_A;
    this.ID_PLAYER_FACTION_B = data.ID_PLAYER_FACTION_B;
    this.ID_PLAYER_FACTION_C = data.ID_PLAYER_FACTION_C;
    this.ID_PLAYER_FACTION_D = data.ID_PLAYER_FACTION_D;
    this.ID_FACTION_WINNER = data.ID_FACTION_WINNER;
    this.IDATTACK = data.IDATTACK;
    this.UPDATED = data.UPDATED;
  }
}

module.exports = Pconfight;
