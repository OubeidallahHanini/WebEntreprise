const mongoose = require('mongoose');

const expertiseSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const ExpertiseSection = mongoose.model('ExpertiseSection', expertiseSectionSchema);

module.exports = ExpertiseSection;