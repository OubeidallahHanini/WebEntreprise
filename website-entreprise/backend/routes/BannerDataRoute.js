const express = require('express');
const router = express.Router();
const bannerController = require('../controller/BannerDataController');

// Créer une nouvelle bannière
router.post('/CreateBanner', bannerController.createBannerData);

// Obtenir toutes les bannières
router.get('/AllBanner', bannerController.getAllBannerData);

// Obtenir une bannière spécifique par ID
router.get('/Banner/:id', bannerController.getBannerDataById);

// Mettre à jour une bannière
router.put('/UpdateBanner/:id', bannerController.updateBannerData);

// Supprimer une bannière
router.delete('/Deletebanner/:id', bannerController.deleteBannerData);

module.exports = router;
