const mongoose = require('mongoose');

const BlogDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const BlogData = mongoose.models.BlogData || mongoose.model('BlogData', BlogDataSchema);

module.exports = BlogData;
