const Footer = require('../models/Footer');

// Créer une nouvelle entrée Footer
exports.createFooter = async (req, res) => {
  try {
    const footer = new Footer(req.body);
    const savedFooter = await footer.save();
    res.status(201).json(savedFooter);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du footer', error });
  }
};

// Obtenir toutes les entrées Footer
exports.getAllFooters = async (req, res) => {
  try {
    const footers = await Footer.find();
    res.status(200).json(footers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des footers', error });
  }
};

// Obtenir une entrée Footer par ID
exports.getFooterById = async (req, res) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) {
      return res.status(404).json({ message: 'Footer non trouvé' });
    }
    res.status(200).json(footer);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du footer', error });
  }
};

// Mettre à jour une entrée Footer
exports.updateFooter = async (req, res) => {
  try {
    const updatedFooter = await Footer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFooter) {
      return res.status(404).json({ message: 'Footer non trouvé' });
    }
    res.status(200).json(updatedFooter);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du footer', error });
  }
};

// Supprimer une entrée Footer
exports.deleteFooter = async (req, res) => {
  try {
    const deletedFooter = await Footer.findByIdAndDelete(req.params.id);
    if (!deletedFooter) {
      return res.status(404).json({ message: 'Footer non trouvé' });
    }
    res.status(200).json({ message: 'Footer supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du footer', error });
  }
};
