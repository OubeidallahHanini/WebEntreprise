const ShowcaseSection = require('../models/ShowcaseSection');

// Obtenir toutes les entrées ShowcaseSection
exports.getAllShowcaseSections = async (req, res) => {
  try {
    const showcaseSections = await ShowcaseSection.find();
    res.status(200).json(showcaseSections);
  } catch (err) {
    console.error('Error fetching showcase sections:', err.message);
    res.status(500).json({ error: 'Failed to fetch showcase sections' });
  }
};

// Obtenir une seule entrée ShowcaseSection par ID
exports.getShowcaseSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const showcaseSection = await ShowcaseSection.findById(id);
    if (!showcaseSection) {
      return res.status(404).json({ error: 'ShowcaseSection not found' });
    }
    res.status(200).json(showcaseSection);
  } catch (err) {
    console.error('Error fetching showcase section:', err.message);
    res.status(500).json({ error: 'Failed to fetch showcase section' });
  }
};

// Créer une nouvelle entrée ShowcaseSection
exports.createShowcaseSection = async (req, res) => {
  try {
    const newShowcaseSection = new ShowcaseSection({
      TitleHero: req.body.TitleHero,
      titleSection: req.body.titleSection,
      paragraphSection: req.body.paragraphSection,
    });

    console.log(req.body);
    await newShowcaseSection.save();
    res.status(201).json(newShowcaseSection);
  } catch (err) {
    console.error('Error creating showcase section:', err.message);
    res.status(500).json({ error: 'Failed to create showcase section' });
  }
};

// Mettre à jour une entrée ShowcaseSection par ID
exports.updateShowcaseSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShowcaseSection = await ShowcaseSection.findByIdAndUpdate(
      id,
      {
        TitleHero: req.body.TitleHero,
        titleSection: req.body.titleSection,
        paragraphSection: req.body.paragraphSection,
      },
      { new: true }
    );

    if (!updatedShowcaseSection) {
      return res.status(404).json({ error: 'ShowcaseSection not found' });
    }
    res.status(200).json(updatedShowcaseSection);
  } catch (err) {
    console.error('Error updating showcase section:', err.message);
    res.status(500).json({ error: 'Failed to update showcase section' });
  }
};

// Supprimer une entrée ShowcaseSection par ID
exports.deleteShowcaseSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShowcaseSection = await ShowcaseSection.findByIdAndDelete(id);
    if (!deletedShowcaseSection) {
      return res.status(404).json({ error: 'ShowcaseSection not found' });
    }
    res.status(200).json({ message: 'ShowcaseSection deleted successfully' });
  } catch (err) {
    console.error('Error deleting showcase section:', err.message);
    res.status(500).json({ error: 'Failed to delete showcase section' });
  }
};
