// models/AuxUser.js
class AuxUser {
  constructor(data) {
    this.aux_user_id = data.aux_user_id;
    this.id_player = data.id_player;
    this.id_faction = data.id_faction;
    this.updated = data.updated;
  }
}

module.exports = AuxUser;
