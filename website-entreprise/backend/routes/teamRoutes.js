const express = require('express');
const multer = require('multer');
const path = require('path');
const teamController = require('../controller/teamController'); // Assurez-vous que le chemin est correct
const upload = require('../midllewares/uploadMiddleware'); // Corrigez le chemin si nécessaire


// Configuration de Multer


const router = express.Router();

// POST route to create a new team data with cover image upload
router.post('/createteamData', upload.single('cover'), teamController.createTeamData);

// GET route to fetch all team data
router.get('/AllteamData', teamController.getAllTeamData);

// GET route to fetch a specific team data by ID
router.get('/teamData/:id', teamController.getTeamDataById);

// PUT route to update a specific team data by ID with optional cover image upload
router.put('/UpdateteamData/:id', upload.single('cover'), teamController.updateTeamData);

// DELETE route to remove a specific team data by ID
router.delete('/DeleteteamData/:id', teamController.deleteTeamData);

module.exports = router;
