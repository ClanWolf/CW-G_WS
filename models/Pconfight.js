// models/Pconfight.js
class Pconfight {
  constructor(data) {
    this.pconfight_id = data.pconfight_id;
    this.pconfight_name = data.pconfight_name;
    this.pconfight_location = data.pconfight_location;
    this.pconfight_quirk = data.pconfight_quirk;
    this.id_pconcampaign = data.id_pconcampaign;
    this.id_player_faction_a = data.id_player_faction_a;
    this.id_player_faction_b = data.id_player_faction_b;
    this.id_player_faction_c = data.id_player_faction_c;
    this.id_player_faction_d = data.id_player_faction_d;
    this.id_faction_winner = data.id_faction_winner;
    this.idattack = data.idattack;
    this.updated = data.updated;
  }
}

module.exports = Pconfight;
