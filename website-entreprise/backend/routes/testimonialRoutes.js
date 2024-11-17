const express = require('express');
const router = express.Router();
const testimonialController = require('../controller/testimonialController');
const upload = require('../midllewares/uploadMiddleware'); // Corrigez le chemin si nécessaire

// Route pour créer une nouvelle entrée de testimonialData
router.post('/CreatetestimonialData', upload.single('cover'),testimonialController.createTestimonialData);

// Route pour obtenir toutes les entrées de testimonialData
router.get('/AlltestimonialData', testimonialController.getAllTestimonialData);

// Route pour obtenir une entrée spécifique de testimonialData par ID
router.get('/testimonialData/:id', testimonialController.getTestimonialDataById);

// Route pour mettre à jour une entrée spécifique de testimonialData par ID
router.put('/UpdateTestimonialData/:id', upload.single('cover'), testimonialController.updateTestimonialData);

// Route pour supprimer une entrée spécifique de testimonialData par ID
router.delete('/testimonialData/:id', testimonialController.deleteTestimonialData);

module.exports = router;
