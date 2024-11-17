const TeamSection = require('../models/TeamSection');

// Créer une nouvelle entrée TeamSection
exports.createTeamSection = async (req, res) => {
  try {
    const { Title, phraseAccroche } = req.body;

    // Vérifier les champs requis
    if (!Title || !phraseAccroche) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Créer une nouvelle entrée dans TeamSection
    const teamSection = new TeamSection({ Title, phraseAccroche });

    // Sauvegarder l'entrée dans la base de données
    await teamSection.save();
    res.status(201).json(teamSection);
  } catch (error) {
    console.error('Error creating team section:', error.message);
    res.status(500).json({ error: 'Failed to create team section' });
  }
};

// Obtenir toutes les entrées TeamSection
exports.getAllTeamSections = async (req, res) => {
  try {
    const teamSections = await TeamSection.find();
    res.status(200).json(teamSections);
  } catch (error) {
    console.error('Error fetching team sections:', error.message);
    res.status(500).json({ error: 'Failed to fetch team sections' });
  }
};

// Obtenir une entrée TeamSection spécifique par ID
exports.getTeamSectionById = async (req, res) => {
  try {
    const teamSection = await TeamSection.findById(req.params.id);
    if (!teamSection) {
      return res.status(404).json({ error: 'Team section not found' });
    }
    res.status(200).json(teamSection);
  } catch (error) {
    console.error('Error fetching team section by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch team section' });
  }
};

// Mettre à jour une entrée TeamSection
exports.updateTeamSection = async (req, res) => {
  try {
    const { Title, phraseAccroche } = req.body;
    const updateData = { Title, phraseAccroche, updatedAt: Date.now() };

    const updatedTeamSection = await TeamSection.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedTeamSection) {
      return res.status(404).json({ error: 'Team section not found' });
    }
    res.status(200).json(updatedTeamSection);
  } catch (error) {
    console.error('Error updating team section:', error.message);
    res.status(500).json({ error: 'Failed to update team section' });
  }
};

// Supprimer une entrée TeamSection
exports.deleteTeamSection = async (req, res) => {
  try {
    const teamSection = await TeamSection.findByIdAndDelete(req.params.id);
    if (!teamSection) {
      return res.status(404).json({ error: 'Team section not found' });
    }
    res.status(200).json({ message: 'Team section deleted successfully' });
  } catch (error) {
    console.error('Error deleting team section:', error.message);
    res.status(500).json({ error: 'Failed to delete team section' });
  }
};
