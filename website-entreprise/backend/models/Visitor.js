const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const VisitorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  numtel: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  photo: {
    type: String, // You can store the photo URL or Base64 string
    required: false,
    default: "https://media.istockphoto.com/id/1433039224/fr/photo/ic%C3%B4ne-3d-de-lutilisateur-bleu-concept-de-profil-de-personne-isol%C3%A9-sur-fond-blanc-avec.webp?b=1&s=612x612&w=0&k=20&c=n1QA3bGtBS6T03r1BpaaAkYhpvzYckpgmYVzhTcgFoo=",
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

VisitorSchema.plugin(passportLocalMongoose);

const Visitor = mongoose.model("Visitor", VisitorSchema);

module.exports = { Visitor };
