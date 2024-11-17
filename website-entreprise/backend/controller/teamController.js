const TeamData = require('../models/TeamData');
const path = require('path');
const fs = require('fs');

// Créer une nouvelle entrée TeamData
exports.createTeamData = async (req, res) => {
    try {
        // Extraire les champs du corps de la requête
        const { title, post } = req.body;
        const cover = req.file.path;

        // Vérifier les champs requis
        if (!title || !post || !cover) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Créer une nouvelle entrée dans TeamData
        const teamData = new TeamData({ title, cover, post });

        // Sauvegarder l'entrée dans la base de données
        await teamData.save();
        res.status(201).json(teamData);
    } catch (error) {
        console.error('Error creating team data:', error.message);
        res.status(500).json({ error: 'Failed to create team data' });
    }
};

// Obtenir toutes les entrées TeamData
exports.getAllTeamData = async (req, res) => {
    try {
        const teamDataList = await TeamData.find();

        // Transformer teamDataList pour inclure uniquement le nom de fichier pour cover
        const transformedTeamDataList = teamDataList.map(teamData => ({
            ...teamData.toObject(),
            cover: path.basename(teamData.cover) // Extraire uniquement le nom de fichier
        }));

        res.status(200).json(transformedTeamDataList);
    } catch (err) {
        console.error('Error fetching team data:', err.message);
        res.status(500).json({ error: 'Failed to fetch team data' });
    }
};

// Obtenir une entrée TeamData spécifique par ID
exports.getTeamDataById = async (req, res) => {
    try {
        const teamData = await TeamData.findById(req.params.id);
        if (!teamData) {
            return res.status(404).json({ error: 'Team data not found' });
        }
        res.status(200).json(teamData);
    } catch (error) {
        console.error('Error fetching team data by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch team data' });
    }
};

// Mettre à jour une entrée TeamData
exports.updateTeamData = async (req, res) => {
    try {
        const { title, post } = req.body;
        const updateData = { title, post, updatedAt: Date.now() };

        if (req.file) {
            const teamData = await TeamData.findById(req.params.id);
            if (teamData.cover) {
                fs.unlinkSync(teamData.cover); // Supprimer l'ancien fichier cover
            }
            updateData.cover = req.file.path;
        }

        const updatedTeamData = await TeamData.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedTeamData) {
            return res.status(404).json({ error: 'Team data not found' });
        }
        res.status(200).json(updatedTeamData);
    } catch (error) {
        console.error('Error updating team data:', error.message);
        res.status(500).json({ error: 'Failed to update team data' });
    }
};

// Supprimer une entrée TeamData
exports.deleteTeamData = async (req, res) => {
    try {
        const teamData = await TeamData.findByIdAndDelete(req.params.id);
        if (teamData && teamData.cover) {
            fs.unlinkSync(teamData.cover); // Supprimer le fichier cover
        }
        res.status(200).json({ message: 'Team data deleted successfully' });
    } catch (error) {
        console.error('Error deleting team data:', error.message);
        res.status(500).json({ error: 'Failed to delete team data' });
    }
};
