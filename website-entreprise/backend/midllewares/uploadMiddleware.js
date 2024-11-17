const multer = require('multer');
const path = require('path');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'photos')); // Save to 'photos' folder
  },
  filename: (req, file, cb) => {
    // Add a timestamp to the filename to avoid name conflicts
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filter file types (optional, e.g., only allow images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const uploadMiddleware = multer({ storage, fileFilter });

module.exports = uploadMiddleware;
