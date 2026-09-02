// models/AuxFightUser.js
class AuxFightUser {
  constructor(data) {
    this.aux_fightuser_id = data.aux_fightuser_id;
    this.id_aux_fight = data.id_aux_fight;
    this.id_player = data.id_player;
    this.id_faction = data.id_faction;
    this.updated = data.updated;
  }
}

module.exports = AuxFightUser;
