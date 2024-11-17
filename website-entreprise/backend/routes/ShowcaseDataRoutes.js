const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const showcaseController = require('../controller/ShowcaseDataController');
const upload = require('../midllewares/uploadMiddleware'); // Corrigez le chemin si nécessaire



// Routes CRUD pour ShowcaseData

// Créer une nouvelle entrée ShowcaseData
router.post('/CreateShowcaseData', upload.single('cover'), showcaseController.createShowcaseData);

// Obtenir toutes les entrées ShowcaseData
router.get('/AllShowcaseData', showcaseController.getAllShowcaseData);

// Obtenir une entrée ShowcaseData spécifique par ID
router.get('/ShowcaseData/:id', showcaseController.getShowcaseDataById);

// Mettre à jour une entrée ShowcaseData
router.put('/UpdateShowcaseData/:id', upload.single('cover'), showcaseController.updateShowcaseData);

// Supprimer une entrée ShowcaseData
router.delete('/DeleteShowcaseData/:id', showcaseController.deleteShowcaseData);

module.exports = router;
