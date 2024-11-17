const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  numtel: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,  // You can store the photo URL or Base64 string
    required: false
  }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = {User};
