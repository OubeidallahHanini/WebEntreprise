const Agency = require('../models/Agency');
const path = require('path');
const fs = require('fs');

// Créer une nouvelle entrée Agency
exports.createAgency = async (req, res) => {
  try {
    // Vérifier si les fichiers sont présents
    if (!req.files || !req.files['cover1'] || !req.files['cover2']) {
      return res.status(400).json({ error: 'Both cover1 and cover2 files are required' });
    }

    // Extraire les chemins des fichiers
    const cover1Path = req.files['cover1'][0].path;
    const cover2Path = req.files['cover2'][0].path;

    // Extraire les champs du corps de la requête
    const { sectionName, titleSection1, titleDesc1, desc1, yearsExperience, successfulCases, industryAwards, titleSection2, desc2 } = req.body;

    // Créer une nouvelle entrée dans Agency
    const agency = new Agency({
      sectionName,
      titleSection1,
      titleDesc1,
      desc1,
      yearsExperience,
      successfulCases,
      industryAwards,
      cover1: cover1Path,
      titleSection2,
      desc2,
      cover2: cover2Path,
    });

    // Sauvegarder l'entrée dans la base de données
    await agency.save();
    res.status(201).json(agency);
  } catch (error) {
    console.error('Error creating agency:', error.message);
    res.status(500).json({ error: 'Failed to create agency' });
  }
};

// Obtenir toutes les entrées Agency
exports.getAllAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find();

    // Transformer les données pour inclure uniquement les noms de fichiers pour cover1 et cover2
    const transformedAgencies = agencies.map(agency => ({
      ...agency.toObject(),
      cover1: path.basename(agency.cover1), // Extraire uniquement le nom de fichier
      cover2: path.basename(agency.cover2)  // Extraire uniquement le nom de fichier
    }));

    res.status(200).json(transformedAgencies);
  } catch (err) {
    console.error('Error fetching agencies:', err.message);
    res.status(500).json({ error: 'Failed to fetch agencies' });
  }
};

// Obtenir une entrée Agency spécifique par ID
exports.getAgencyById = async (req, res) => {
  try {
    const agency = await Agency.findById(req.params.id);
    if (!agency) {
      return res.status(404).json({ error: 'Agency not found' });
    }
    res.status(200).json(agency);
  } catch (error) {
    console.error('Error fetching agency by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch agency' });
  }
};

// Mettre à jour une entrée Agency
exports.updateAgency = async (req, res) => {
  try {
    const updateData = { updatedAt: Date.now() };

    // Vérifier si les fichiers sont présents et mettre à jour si nécessaire
    if (req.files) {
      const agency = await Agency.findById(req.params.id);
      if (!agency) {
        return res.status(404).json({ error: 'Agency not found' });
      }

      if (req.files['cover1']) {
        if (agency.cover1) {
          fs.unlinkSync(agency.cover1); // Supprimer l'ancien fichier cover1
        }
        updateData.cover1 = req.files['cover1'][0].path;
      }

      if (req.files['cover2']) {
        if (agency.cover2) {
          fs.unlinkSync(agency.cover2); // Supprimer l'ancien fichier cover2
        }
        updateData.cover2 = req.files['cover2'][0].path;
      }
    }

    // Mettre à jour les autres champs
    const { sectionName, titleSection1, titleDesc1, desc1, yearsExperience, successfulCases, industryAwards, titleSection2, desc2 } = req.body;
    Object.assign(updateData, { sectionName, titleSection1, titleDesc1, desc1, yearsExperience, successfulCases, industryAwards, titleSection2, desc2 });

    // Mettre à jour l'entrée dans la base de données
    const updatedAgency = await Agency.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedAgency);
  } catch (error) {
    console.error('Error updating agency:', error.message);
    res.status(500).json({ error: 'Failed to update agency' });
  }
};

// Supprimer une entrée Agency
exports.deleteAgency = async (req, res) => {
  try {
    const agency = await Agency.findByIdAndDelete(req.params.id);
    if (agency) {
      if (agency.cover1) fs.unlinkSync(agency.cover1); // Supprimer le fichier cover1
      if (agency.cover2) fs.unlinkSync(agency.cover2); // Supprimer le fichier cover2
    }
    res.status(200).json({ message: 'Agency deleted successfully' });
  } catch (error) {
    console.error('Error deleting agency:', error.message);
    res.status(500).json({ error: 'Failed to delete agency' });
  }
};
