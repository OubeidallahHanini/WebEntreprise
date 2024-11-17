const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma pour le formulaire Contact
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['business', 'complaint'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Créer un modèle à partir du schéma
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;