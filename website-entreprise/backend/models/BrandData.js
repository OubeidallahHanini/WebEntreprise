const mongoose = require('mongoose');

const BrandDataSchema = new mongoose.Schema({
  cover: {
    type: String,
    required: true,
  },
});

const BrandData = mongoose.models.BrandData || mongoose.model('BrandData', BrandDataSchema);

module.exports = BrandData;
