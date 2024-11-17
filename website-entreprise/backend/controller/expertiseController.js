const ExpertiseData = require('../models/ExpertiseData');
const path = require('path');
const fs = require('fs');

// Créer une nouvelle entrée ExpertiseData
exports.createExpertiseData = async (req, res) => {
    try {
        // Vérifier si le fichier est présent
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extraire les champs du corps de la requête
        const { title, desc } = req.body;
        const cover = req.file.path;

        // Vérifier les champs requis
        if (!title || !cover || !desc) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Créer une nouvelle entrée dans ExpertiseData
        const expertiseData = new ExpertiseData({ title, cover, desc });

        // Sauvegarder l'entrée dans la base de données
        await expertiseData.save();
        res.status(201).json(expertiseData);
    } catch (error) {
        console.error('Error creating expertise data:', error.message);
        res.status(500).json({ error: 'Failed to create expertise data' });
    }
};

exports.getAllExpertiseData = async (req, res) => {
    try {
      const expertiseDataList = await ExpertiseData.find();
      
      // Transform expertiseData to only include filename for cover
      const transformedExpertiseData = expertiseDataList.map(expertise => ({
        ...expertise.toObject(),
        cover: path.basename(expertise.cover) // Extract only the filename
      }));
  
      res.json(transformedExpertiseData); // Respond with transformed expertise data
    } catch (err) {
      console.error('Error fetching expertise data:', err.message);
      res.status(500).json({ error: 'Failed to fetch expertise data' });
    }
  };

// Obtenir une entrée ExpertiseData spécifique par ID
exports.getExpertiseDataById = async (req, res) => {
    try {
        const expertiseData = await ExpertiseData.findById(req.params.id);
        if (!expertiseData) {
            return res.status(404).json({ error: 'Expertise data not found' });
        }
        res.status(200).json(expertiseData);
    } catch (error) {
        console.error('Error fetching expertise data by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch expertise data' });
    }
};

// Mettre à jour une entrée ExpertiseData
exports.updateExpertiseData = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const updateData = { title, desc, updatedAt: Date.now() };

        if (req.file) {
            const expertiseData = await ExpertiseData.findById(req.params.id);
            if (expertiseData.cover) {
                fs.unlinkSync(expertiseData.cover); // Supprimer l'ancien fichier cover
            }
            updateData.cover = req.file.path;
        }

        const updatedExpertiseData = await ExpertiseData.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedExpertiseData) {
            return res.status(404).json({ error: 'Expertise data not found' });
        }
        res.status(200).json(updatedExpertiseData);
    } catch (error) {
        console.error('Error updating expertise data:', error.message);
        res.status(500).json({ error: 'Failed to update expertise data' });
    }
};

// Supprimer une entrée ExpertiseData
exports.deleteExpertiseData = async (req, res) => {
    try {
        const expertiseData = await ExpertiseData.findByIdAndDelete(req.params.id);
        if (expertiseData && expertiseData.cover) {
            fs.unlinkSync(expertiseData.cover); // Supprimer le fichier cover
        }
        res.status(200).json({ message: 'Expertise data deleted successfully' });
    } catch (error) {
        console.error('Error deleting expertise data:', error.message);
        res.status(500).json({ error: 'Failed to delete expertise data' });
    }
};
