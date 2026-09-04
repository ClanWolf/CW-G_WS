// models/AuxFightUser.js
class AuxFightUser {
  constructor(data) {
    this.id_fightuser = data.id_fightuser;
    this.fight_id = data.fight_id;
    this.user_id = data.user_id;
    this.faction_id = data.faction_id;
    this.fightcreator = data.fightcreator;
    this.updated = data.updated;
  }
}

module.exports = AuxFightUser;
