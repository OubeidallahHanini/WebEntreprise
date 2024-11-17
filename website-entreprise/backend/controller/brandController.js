const BrandData = require('../models/BrandData');
const path = require('path');
const fs = require('fs');

// Créer une nouvelle entrée BrandData
exports.createBrandData = async (req, res) => {
  try {
    // Vérifier si le fichier est présent
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extraire le champ du corps de la requête
    const cover = req.file.path;

    // Vérifier le champ requis
    if (!cover) {
      return res.status(400).json({ error: 'Cover is required' });
    }

    // Créer une nouvelle entrée dans BrandData
    const brandData = new BrandData({ cover });

    // Sauvegarder l'entrée dans la base de données
    await brandData.save();
    res.status(201).json(brandData);
  } catch (error) {
    console.error('Error creating brand data:', error.message);
    res.status(500).json({ error: 'Failed to create brand data' });
  }
};

// Obtenir toutes les entrées BrandData
exports.getAllBrandData = async (req, res) => {
  try {
    const brandDataList = await BrandData.find();

    // Transformer brandDataList pour inclure uniquement le nom de fichier pour cover
    const transformedBrandDataList = brandDataList.map(brand => ({
      ...brand.toObject(),
      cover: path.basename(brand.cover) // Extraire uniquement le nom de fichier
    }));

    res.status(200).json(transformedBrandDataList);
  } catch (err) {
    console.error('Error fetching brand data:', err.message);
    res.status(500).json({ error: 'Failed to fetch brand data' });
  }
};

// Obtenir une entrée BrandData spécifique par ID
exports.getBrandDataById = async (req, res) => {
  try {
    const brandData = await BrandData.findById(req.params.id);
    if (!brandData) {
      return res.status(404).json({ error: 'Brand data not found' });
    }
    res.status(200).json(brandData);
  } catch (error) {
    console.error('Error fetching brand data by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch brand data' });
  }
};

// Mettre à jour une entrée BrandData
exports.updateBrandData = async (req, res) => {
  try {
    const updateData = { updatedAt: Date.now() };

    if (req.file) {
      const brandData = await BrandData.findById(req.params.id);
      if (brandData.cover) {
        fs.unlinkSync(brandData.cover); // Supprimer l'ancien fichier cover
      }
      updateData.cover = req.file.path;
    }

    const updatedBrandData = await BrandData.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedBrandData) {
      return res.status(404).json({ error: 'Brand data not found' });
    }
    res.status(200).json(updatedBrandData);
  } catch (error) {
    console.error('Error updating brand data:', error.message);
    res.status(500).json({ error: 'Failed to update brand data' });
  }
};

// Supprimer une entrée BrandData
exports.deleteBrandData = async (req, res) => {
  try {
    const brandData = await BrandData.findByIdAndDelete(req.params.id);
    if (brandData && brandData.cover) {
      fs.unlinkSync(brandData.cover); // Supprimer le fichier cover
    }
    res.status(200).json({ message: 'Brand data deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand data:', error.message);
    res.status(500).json({ error: 'Failed to delete brand data' });
  }
};
