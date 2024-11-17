const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
  logoTitle: {
    type: String,
    required: true,
  },
  logoCaption: {
    type: String,
    required: true,
  },
 
    contactInfoPhone: {
      type: String,
      required: true,
    },
    contactInfoDesc: {
        type: String,
        required: true,
      },
    contactInfoButton: {
      type: String,
      required: true,
    },
 
  companyLinks: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  services: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  socialLinks: [
    {
    
      icon: {
        type: String, // Icon class or URL
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  
    companyName: {
      type: String,
      required: true,
    },
   

  year: {
    type: String,
    required: true,
  },
});

const Footer = mongoose.models.Footer || mongoose.model('Footer', FooterSchema);

module.exports = Footer;
