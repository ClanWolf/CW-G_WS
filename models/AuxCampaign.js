// models/AuxCampaign.js
class AuxCampaign {
  constructor(data) {
    this.aux_campaign_id = data.aux_campaign_id;
    this.campaign_name = data.campaign_name;
    this.campaign_description = data.campaign_description;
    this.status = data.status;
    this.updated = data.updated;
  }
}

module.exports = AuxCampaign;
