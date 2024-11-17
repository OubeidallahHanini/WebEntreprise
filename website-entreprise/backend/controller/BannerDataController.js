const BannerData = require('../models/BannerData');

// Créer une nouvelle entrée BannerData
exports.createBannerData = async (req, res) => {
    try {
        const { title, titleLogo, buttonLabel } = req.body;
        const bannerData = new BannerData({ title, titleLogo, buttonLabel });

        await bannerData.save();
        res.status(201).json(bannerData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create banner' });
    }
};

// Obtenir toutes les entrées BannerData
exports.getAllBannerData = async (req, res) => {
    try {
        const bannerDataList = await BannerData.find();
        res.json(bannerDataList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch banners' });
    }
};

// Obtenir une entrée BannerData spécifique par ID
exports.getBannerDataById = async (req, res) => {
    try {
        const bannerData = await BannerData.findById(req.params.id);
        if (!bannerData) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        res.status(200).json(bannerData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch banner' });
    }
};

// Mettre à jour une entrée BannerData
exports.updateBannerData = async (req, res) => {
    try {
        const { title, titleLogo, buttonLabel } = req.body;
        const updateData = { title, titleLogo, buttonLabel, updatedAt: Date.now() };

        const updatedBannerData = await BannerData.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedBannerData) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        res.status(200).json(updatedBannerData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update banner' });
    }
};

// Supprimer une entrée BannerData
exports.deleteBannerData = async (req, res) => {
    try {
        const bannerData = await BannerData.findByIdAndDelete(req.params.id);
        if (!bannerData) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete banner' });
    }
};
