const express = require('express');
const router = express.Router();
const serviceController = require('../controller/serviceController');

// Route pour créer un nouveau service
router.post('/CreateServicePage', serviceController.createService);

// Route pour obtenir tous les services
router.get('/AllServicePage', serviceController.getAllServices);

// Route pour obtenir un service par ID
router.get('/ServicePage/:id', serviceController.getServiceById);

// Route pour mettre à jour un service
router.put('/UpdateServicePage/:id', serviceController.updateService);

// Route pour supprimer un service
router.delete('/deleteServicePage/:id', serviceController.deleteService);

module.exports = router;
