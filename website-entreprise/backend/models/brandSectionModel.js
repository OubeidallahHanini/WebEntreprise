const mongoose = require('mongoose');

const BrandSectionSchema = new mongoose.Schema({
  titleHero: {
    type: String,
    required: true,
  },
});

const BrandSection = mongoose.models.BrandSection || mongoose.model('BrandSection', BrandSectionSchema);

module.exports = BrandSection;
