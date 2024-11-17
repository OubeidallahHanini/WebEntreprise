const express = require('express');
const router = express.Router();
const footerController = require('../controller/footerController');

// Créer une nouvelle entrée Footer
router.post('/CreateFooter', footerController.createFooter);

// Obtenir toutes les entrées Footer
router.get('/AllFooters', footerController.getAllFooters);

// Obtenir une entrée Footer par ID
router.get('/Footer/:id', footerController.getFooterById);

// Mettre à jour une entrée Footer par ID
router.put('/UpdateFooter/:id', footerController.updateFooter);

// Supprimer une entrée Footer par ID
router.delete('/Footer/:id', footerController.deleteFooter);

module.exports = router;
