// models/AuxCampaignFaction.js
class AuxCampaignFaction {
  constructor(data) {
    this.aux_campaignfaction_id = data.aux_campaignfaction_id;
    this.id_aux_campaign = data.id_aux_campaign;
    this.id_faction = data.id_faction;
    this.updated = data.updated;
  }
}

module.exports = AuxCampaignFaction;
