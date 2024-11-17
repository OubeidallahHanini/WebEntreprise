const express = require('express');
const router = express.Router();
const agencyController = require('../controller/AgencyController');
const upload = require('../midllewares/uploadMiddleware'); // Corrigez le chemin si nécessaire

// Routes pour l'entité Agency

// Créer une nouvelle entrée Agency
router.post(
  '/CreateAgency',
  upload.fields([{ name: 'cover1', maxCount: 1 }, { name: 'cover2', maxCount: 1 }]),
  agencyController.createAgency
);

// Obtenir toutes les entrées Agency
router.get('/AllAgency', agencyController.getAllAgencies);

// Obtenir une entrée Agency spécifique par ID
router.get('/Agency/:id', agencyController.getAgencyById);

// Mettre à jour une entrée Agency
router.put(
  '/UpdateAgency/:id',
  upload.fields([{ name: 'cover1', maxCount: 1 }, { name: 'cover2', maxCount: 1 }]),
  agencyController.updateAgency
);

// Supprimer une entrée Agency
router.delete('/Agency/:id', agencyController.deleteAgency);

module.exports = router;
