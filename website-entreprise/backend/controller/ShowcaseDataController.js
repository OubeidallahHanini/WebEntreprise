const ShowcaseData = require('../models/ShowcaseData');
const path = require('path');
const fs = require('fs');

// Créer une nouvelle entrée ShowcaseData
exports.createShowcaseData = async (req, res) => {
    try {
        console.log(req.body)

        // Vérifier si le fichier est présent
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extraire les champs du corps de la requête
        const { title, category } = req.body;
        const cover = req.file.path; // Initialiser correctement 'cover'
        

        // Vérifier les champs requis
        if (!title || !cover || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Créer une nouvelle entrée dans ShowcaseData
        const showcaseData = new ShowcaseData({ title, cover, category });

        // Sauvegarder l'entrée dans la base de données
        await showcaseData.save();
        res.status(201).json(showcaseData);
    } catch (error) {
        console.error('Error creating showcase data:', error.message);
        res.status(500).json({ error: 'Failed to create showcase data' });
    }
};

// Obtenir toutes les entrées ShowcaseData
exports.getAllShowcaseData = async (req, res) => {
    try {
        const showcaseDataList = await ShowcaseData.find();

        // Transformer showcaseDataList pour inclure uniquement le nom de fichier pour cover
        const transformedShowcaseDataList = showcaseDataList.map(showcase => ({
            ...showcase.toObject(),
            cover: path.basename(showcase.cover) // Extraire uniquement le nom de fichier
        }));

        res.status(200).json(transformedShowcaseDataList);
    } catch (err) {
        console.error('Error fetching showcase data:', err.message);
        res.status(500).json({ error: 'Failed to fetch showcase data' });
    }
};

// Obtenir une entrée ShowcaseData spécifique par ID
exports.getShowcaseDataById = async (req, res) => {
    try {
        const showcaseData = await ShowcaseData.findById(req.params.id);
        if (!showcaseData) {
            return res.status(404).json({ error: 'Showcase data not found' });
        }
        res.status(200).json(showcaseData);
    } catch (error) {
        console.error('Error fetching showcase data by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch showcase data' });
    }
};

// Mettre à jour une entrée ShowcaseData
exports.updateShowcaseData = async (req, res) => {
    try {
        const { title, category } = req.body;
        const updateData = { title, category, updatedAt: Date.now() };

        if (req.file) {
            const showcaseData = await ShowcaseData.findById(req.params.id);
            if (showcaseData.cover) {
                fs.unlinkSync(showcaseData.cover); // Supprimer l'ancien fichier cover
            }
            updateData.cover = req.file.path;
        }

        const updatedShowcaseData = await ShowcaseData.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedShowcaseData) {
            return res.status(404).json({ error: 'Showcase data not found' });
        }
        res.status(200).json(updatedShowcaseData);
    } catch (error) {
        console.error('Error updating showcase data:', error.message);
        res.status(500).json({ error: 'Failed to update showcase data' });
    }
};

// Supprimer une entrée ShowcaseData
exports.deleteShowcaseData = async (req, res) => {
    try {
        const showcaseData = await ShowcaseData.findByIdAndDelete(req.params.id);
        if (showcaseData && showcaseData.cover) {
            fs.unlinkSync(showcaseData.cover); // Supprimer le fichier cover
        }
        res.status(200).json({ message: 'Showcase data deleted successfully' });
    } catch (error) {
        console.error('Error deleting showcase data:', error.message);
        res.status(500).json({ error: 'Failed to delete showcase data' });
    }
};
