const mongoose = require('mongoose');

const ShowcaseSectionSchema = new mongoose.Schema({
  TitleHero: {
    type: String,
    required: true,
  },
  titleSection: {
    type: String,
    required: true,
  },
  paragraphSection: {
    type: String,
    required: true, // ou false, selon si ce champ doit être obligatoire
  },
});

const ShowcaseSection = mongoose.models.ShowcaseSection || mongoose.model('ShowcaseSection', ShowcaseSectionSchema);

module.exports = ShowcaseSection;
