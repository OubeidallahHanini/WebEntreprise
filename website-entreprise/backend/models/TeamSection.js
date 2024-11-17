const mongoose = require('mongoose');

const TeamSectionSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  phraseAccroche: {
    type: String,
    required: true,
  },
});

const TeamSection = mongoose.models.TeamSection || mongoose.model('TeamSection', TeamSectionSchema);

module.exports = TeamSection;
