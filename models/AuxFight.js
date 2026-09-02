// models/AuxFight.js
class AuxFight {
  constructor(data) {
    this.aux_fight_id = data.aux_fight_id;
    this.fight_name = data.fight_name;
    this.fight_location = data.fight_location;
    this.fight_quirk = data.fight_quirk;
    this.id_aux_campaign = data.id_aux_campaign;
    this.id_player_faction_a = data.id_player_faction_a;
    this.id_player_faction_b = data.id_player_faction_b;
    this.id_player_faction_c = data.id_player_faction_c;
    this.id_player_faction_d = data.id_player_faction_d;
    this.id_faction_winner = data.id_faction_winner;
    this.id_attack = data.id_attack;
    this.updated = data.updated;
  }
}

module.exports = AuxFight;
