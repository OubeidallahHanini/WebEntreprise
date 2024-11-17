const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  titleSection1: {
    type: String,
    required: true,
  },
  titleDesc1: {
    type: String,
    required: true,
  },
  desc1: {
    type: String,
    required: true,
  },
  yearsExperience: {
    type: String,
    required: true,
  },
  successfulCases: {
    type: String,
    required: true,
  },
  industryAwards: {
    type: String,
    required: true,
  },
  cover1: {
    type: String,
    required: true,
  },
  titleSection2: {
    type: String,
    required: true,
  },
  desc2: {
    type: String,
    required: true,
  },
  cover2: {
    type: String,
    required: true,
  },
});

const Agency = mongoose.models.Agency || mongoose.model('Agency', AgencySchema);

module.exports = Agency;
