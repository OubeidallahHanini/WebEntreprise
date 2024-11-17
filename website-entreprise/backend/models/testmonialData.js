const mongoose = require('mongoose');

const testimonialDataSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  }
});

const testimonialData = mongoose.model('testimonialData', testimonialDataSchema);

module.exports = testimonialData;
