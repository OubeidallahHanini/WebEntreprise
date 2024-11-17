const ExpertiseSection = require('../models/ExpertiseSection');

// Créer une nouvelle section expertise
exports.createExpertiseSection = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const newExpertiseSection = new ExpertiseSection({ title, description });
        await newExpertiseSection.save();

        res.status(201).json(newExpertiseSection);
    } catch (error) {
        console.error('Error creating expertise section:', error.message);
        res.status(500).json({ error: 'Failed to create expertise section' });
    }
};

// Obtenir toutes les sections expertise
exports.getAllExpertiseSections = async (req, res) => {
    try {
        const expertiseSections = await ExpertiseSection.find();
        res.json(expertiseSections);
    } catch (error) {
        console.error('Error fetching expertise sections:', error.message);
        res.status(500).json({ error: 'Failed to fetch expertise sections' });
    }
};

// Obtenir une section expertise spécifique par ID
exports.getExpertiseSectionById = async (req, res) => {
    try {
        const expertiseSection = await ExpertiseSection.findById(req.params.id);
        if (!expertiseSection) {
            return res.status(404).json({ error: 'Expertise section not found' });
        }
        res.status(200).json(expertiseSection);
    } catch (error) {
        console.error('Error fetching expertise section by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch expertise section' });
    }
};

// Mettre à jour une section expertise
exports.updateExpertiseSection = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title && !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const updatedExpertiseSection = await ExpertiseSection.findByIdAndUpdate(
            req.params.id,
            { title, description, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedExpertiseSection) {
            return res.status(404).json({ error: 'Expertise section not found' });
        }

        res.status(200).json(updatedExpertiseSection);
    } catch (error) {
        console.error('Error updating expertise section:', error.message);
        res.status(500).json({ error: 'Failed to update expertise section' });
    }
};

// Supprimer une section expertise
exports.deleteExpertiseSection = async (req, res) => {
    try {
        const expertiseSection = await ExpertiseSection.findByIdAndDelete(req.params.id);
        if (!expertiseSection) {
            return res.status(404).json({ error: 'Expertise section not found' });
        }
        res.status(200).json({ message: 'Expertise section deleted successfully' });
    } catch (error) {
        console.error('Error deleting expertise section:', error.message);
        res.status(500).json({ error: 'Failed to delete expertise section' });
    }
};
