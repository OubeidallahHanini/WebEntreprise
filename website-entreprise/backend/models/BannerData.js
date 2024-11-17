const mongoose = require('mongoose');
const { Schema } = mongoose;

const BannerDataSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  titleLogo: {
    type: String,
    required: true
  },
  buttonLabel: {
    type: String,
    default: 'Request a call-back'
  }
});

const BannerData = mongoose.model('BannerData', BannerDataSchema);

module.exports = BannerData;
