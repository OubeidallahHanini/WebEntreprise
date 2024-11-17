const express = require('express');
const teamSectionController = require('../controller/teamSectionController');
const router = express.Router();

// POST route to create a new team section
router.post('/createteamSection', teamSectionController.createTeamSection);

// GET route to fetch all team sections
router.get('/allteamSection', teamSectionController.getAllTeamSections);

// GET route to fetch a specific team section by ID
router.get('/teamSection/:id', teamSectionController.getTeamSectionById);

// PUT route to update a specific team section by ID
router.put('/UpdateteamSection/:id', teamSectionController.updateTeamSection);

// DELETE route to remove a specific team section by ID
router.delete('/DeleteteamSection/:id', teamSectionController.deleteTeamSection);

module.exports = router;
