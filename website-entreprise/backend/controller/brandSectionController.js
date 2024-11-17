const BrandSection = require('../models/brandSectionModel');

// Créer une nouvelle entrée BrandSection
exports.createBrandSection = async (req, res) => {
  try {
    const { titleHero } = req.body;

    if (!titleHero) {
      return res.status(400).json({ error: 'titleHero is required' });
    }

    const brandSection = new BrandSection({ titleHero });
    await brandSection.save();
    res.status(201).json(brandSection);
  } catch (error) {
    console.error('Error creating brand section:', error.message);
    res.status(500).json({ error: 'Failed to create brand section' });
  }
};

// Obtenir toutes les entrées BrandSection
exports.getAllBrandSections = async (req, res) => {
  try {
    const brandSections = await BrandSection.find();
    res.status(200).json(brandSections);
  } catch (error) {
    console.error('Error fetching brand sections:', error.message);
    res.status(500).json({ error: 'Failed to fetch brand sections' });
  }
};

// Obtenir une entrée BrandSection spécifique par ID
exports.getBrandSectionById = async (req, res) => {
  try {
    const brandSection = await BrandSection.findById(req.params.id);
    if (!brandSection) {
      return res.status(404).json({ error: 'Brand section not found' });
    }
    res.status(200).json(brandSection);
  } catch (error) {
    console.error('Error fetching brand section by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch brand section' });
  }
};

// Mettre à jour une entrée BrandSection
exports.updateBrandSection = async (req, res) => {
  try {
    const { titleHero } = req.body;
    const updateData = { titleHero, updatedAt: Date.now() };

    const updatedBrandSection = await BrandSection.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedBrandSection) {
      return res.status(404).json({ error: 'Brand section not found' });
    }
    res.status(200).json(updatedBrandSection);
  } catch (error) {
    console.error('Error updating brand section:', error.message);
    res.status(500).json({ error: 'Failed to update brand section' });
  }
};

// Supprimer une entrée BrandSection
exports.deleteBrandSection = async (req, res) => {
  try {
    const brandSection = await BrandSection.findByIdAndDelete(req.params.id);
    if (!brandSection) {
      return res.status(404).json({ error: 'Brand section not found' });
    }
    res.status(200).json({ message: 'Brand section deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand section:', error.message);
    res.status(500).json({ error: 'Failed to delete brand section' });
  }
};
