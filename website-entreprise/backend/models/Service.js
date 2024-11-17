const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  }
});

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

module.exports = Service;
