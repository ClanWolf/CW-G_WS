// models/AuxCampaign.js
class AuxCampaign {
  constructor(data) {
    this.id_campaign = data.id_campaign;
    this.campaign_name = data.campaign_name;
    this.campaign_description = data.campaign_description;
    this.updated = data.updated;
  }
}

module.exports = AuxCampaign;
