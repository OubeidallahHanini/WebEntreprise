const express = require('express');
const multer = require('multer');
const expertiseController = require('../controller/expertiseController'); // Assurez-vous que le chemin est correct
const path = require('path');
const upload = require('../midllewares/uploadMiddleware'); // Corrigez le chemin si nécessaire
const router = express.Router();

// POST route to create a new expertise data with cover image upload
router.post('/CreateExpertiseData', upload.single('cover'), expertiseController.createExpertiseData);

// GET route to fetch all expertise data
router.get('/AllexpertiseData', expertiseController.getAllExpertiseData);

// GET route to fetch a specific expertise data by ID
router.get('/expertiseData/:id', expertiseController.getExpertiseDataById);

// PUT route to update a specific expertise data by ID with optional cover image upload
router.put('/expertiseData/:id', upload.single('cover'), expertiseController.updateExpertiseData);

// DELETE route to remove a specific expertise data by ID
router.delete('/expertiseData/:id', expertiseController.deleteExpertiseData);

module.exports = router;
