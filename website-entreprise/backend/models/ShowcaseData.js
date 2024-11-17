const mongoose = require('mongoose');

const ShowcaseDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const ShowcaseData = mongoose.models.ShowcaseData || mongoose.model('ShowcaseData', ShowcaseDataSchema);

module.exports = ShowcaseData;
