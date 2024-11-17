const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroDataSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  heroTitle: {
    type: String,
    required: true,
  },
  subHeadings: {
    type: [String], // Assumption: Array of strings for subheadings
    required: true,
  },
  // Nouveau champ pour la section supplémentaire
  section: {
    headingTitle: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    heroContent: [{
      icon: {
        type: String, // Use a string to store icon identifiers
        required: true,
      },
      title: {
        type: String,
        required: true,
      }
    }],
  }
});

const HeroData = mongoose.model('HeroData', heroDataSchema);

module.exports = HeroData;
