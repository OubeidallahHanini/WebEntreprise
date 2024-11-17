const express = require('express');
const router = express.Router();
const expertiseSectionController = require('../controller/expertiseSectionController');

// Créer une nouvelle section expertise
router.post('/CreateExpertiseSection', expertiseSectionController.createExpertiseSection);

// Obtenir toutes les sections expertise
router.get('/AllExpertiseSection', expertiseSectionController.getAllExpertiseSections);

// Obtenir une section expertise spécifique par ID
router.get('/expertiseSection/:id', expertiseSectionController.getExpertiseSectionById);

// Mettre à jour une section expertise
router.put('/expertiseSection/:id', expertiseSectionController.updateExpertiseSection);

// Supprimer une section expertise
router.delete('/expertiseSection/:id', expertiseSectionController.deleteExpertiseSection);

module.exports = router;
