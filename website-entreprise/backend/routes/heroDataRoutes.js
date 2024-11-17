const express = require('express');
const router = express.Router();
const { createHeroData, listHeroData, getHeroDataDetails, updateHeroData, deleteHeroData } = require('../controller/heroDataController');

// Créer une nouvelle entrée HeroData
router.post('/CreateHeroData', createHeroData);

// Lister toutes les entrées HeroData
router.get('/AllHeroData', listHeroData);

// Obtenir les détails d'une entrée HeroData spécifique par ID
router.get('/HeroData/:heroDataId', getHeroDataDetails);

// Mettre à jour une entrée HeroData spécifique par ID
router.put('/UpdateHeroData/:heroDataId', updateHeroData);

// Supprimer une entrée HeroData spécifique par ID
router.delete('/DeleteHeroData/:heroDataId', deleteHeroData);

module.exports = router;
