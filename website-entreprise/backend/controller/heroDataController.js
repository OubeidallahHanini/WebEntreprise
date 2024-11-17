const HeroData = require('../models/HeroData');

// Créer une nouvelle entrée HeroData
const createHeroData = async (req, res) => {
  const { title, caption, heroTitle, subHeadings, section } = req.body;

  try {
    const newHeroData = new HeroData({ title, caption, heroTitle, subHeadings, section });
    await newHeroData.save();
    res.status(201).json(newHeroData);
  } catch (error) {
    console.error('Error creating hero data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lister toutes les entrées HeroData
const listHeroData = async (req, res) => {
  try {
    const heroDataList = await HeroData.find();
    res.status(200).json(heroDataList);
  } catch (error) {
    console.error('Error fetching hero data list:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Obtenir les détails d'une entrée HeroData par ID
const getHeroDataDetails = async (req, res) => {
  const { heroDataId } = req.params;

  try {
    const heroData = await HeroData.findById(heroDataId);

    if (!heroData) {
      return res.status(404).json({ message: 'Hero data not found' });
    }

    res.status(200).json(heroData);
  } catch (error) {
    console.error('Error fetching hero data details:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Mettre à jour une entrée HeroData
const updateHeroData = async (req, res) => {
  const { heroDataId } = req.params;
  const { title, caption, heroTitle, subHeadings, section } = req.body;

  try {
    const heroData = await HeroData.findByIdAndUpdate(
      heroDataId,
      { title, caption, heroTitle, subHeadings, section },
      { new: true }
    );

    if (!heroData) {
      return res.status(404).json({ message: 'Hero data not found' });
    }

    res.status(200).json(heroData);
  } catch (error) {
    console.error('Error updating hero data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Supprimer une entrée HeroData
const deleteHeroData = async (req, res) => {
  const { heroDataId } = req.params;

  try {
    const heroData = await HeroData.findByIdAndDelete(heroDataId);

    if (!heroData) {
      return res.status(404).json({ message: 'Hero data not found' });
    }

    res.status(200).json({ message: 'Hero data deleted successfully' });
  } catch (error) {
    console.error('Error deleting hero data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createHeroData, listHeroData, getHeroDataDetails, updateHeroData, deleteHeroData };
