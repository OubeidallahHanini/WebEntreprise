const { Visitor } = require('../models/Visitor');
const path = require('path');
const fs = require('fs');

// Obtenir tous les visiteurs
exports.listVisitor = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Obtenir les détails d'un visiteur spécifique
exports.getVisitorDetails = async (req, res) => {
    const { VisitorId } = req.params;
    try {
        const visitor = await Visitor.findById(VisitorId);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Mettre à jour un visiteur
exports.updateVisitor = async (req, res) => {
    console.log('EXECUTION DE LUPDATE   ')
    const { VisitorId } = req.params;
    const { username, numtel, address, bio } = req.body;

    const updateData = { username,  numtel, address, bio, updatedAt: Date.now() };

    try {

        if (req.file) {
            const visitor = await Visitor.findById(VisitorId);
            if (visitor.photo) {
                fs.unlinkSync(visitor.photo); // Supprimer l'ancienne photo
            }
            updateData.photo = req.file;
            console.log("updateData.photo")
        }



        const updatedVisitor = await Visitor.findByIdAndUpdate(VisitorId, updateData, { new: true });
        if (!updatedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(updatedVisitor);
    } catch (error) {
        console.error('Error updating visitor:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Supprimer un visiteur
exports.deleteUser = async (req, res) => {
    const { VisitorId } = req.params;

    try {
        const visitor = await Visitor.findByIdAndDelete(VisitorId);
        if (visitor && visitor.photo) {
            fs.unlinkSync(visitor.photo); // Supprimer le fichier photo
        }
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
