// models/AuxUser.js
class AuxUser {
  constructor(data) {
    this.id_user = data.id_user;
    this.username = data.username;
    this.updated = data.updated;
  }
}

module.exports = AuxUser;
