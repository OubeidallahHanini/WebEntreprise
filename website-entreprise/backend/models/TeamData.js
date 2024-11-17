const mongoose = require('mongoose');

const teamDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String, // Le chemin vers l'image
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const TeamData = mongoose.model('TeamData', teamDataSchema);

module.exports = TeamData;
