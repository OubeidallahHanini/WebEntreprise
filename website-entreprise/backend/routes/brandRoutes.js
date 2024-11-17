const express = require('express');
const multer = require('multer');
const brandController = require('../controller/brandController');
const upload = require('../midllewares/uploadMiddleware'); // Assurez-vous que le chemin est correct
const router = express.Router();

// POST route to create a new brand data with cover image upload
router.post('/createBrandData', upload.single('cover'), brandController.createBrandData);

// GET route to fetch all brand data
router.get('/allBrandData', brandController.getAllBrandData);

// GET route to fetch a specific brand data by ID
router.get('/BrandData/:id', brandController.getBrandDataById);

// PUT route to update a specific brand data by ID with optional cover image upload
router.put('/UpdateBrandData/:id', upload.single('cover'), brandController.updateBrandData);

// DELETE route to remove a specific brand data by ID
router.delete('/DeleteBrandData/:id', brandController.deleteBrandData);

module.exports = router;
