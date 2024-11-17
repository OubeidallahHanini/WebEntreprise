const TestimonialData = require('../models/testmonialData');
const path = require('path');
const fs = require('fs');

// Créer une nouvelle entrée TestimonialData
exports.createTestimonialData = async (req, res) => {
    try {
        console.log(req.body.name)

        // Vérifier si le fichier est présent
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
         }

        // Extraire les champs du corps de la requête
        const { name, post, desc } = req.body;
        const cover = req.file.path;

        // Vérifier les champs requis
        if (!name || !cover || !post || !desc) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Créer une nouvelle entrée dans TestimonialData
        const testimonialData = new TestimonialData({ name, cover, post, desc });

        // Sauvegarder l'entrée dans la base de données
        await testimonialData.save();
        res.status(201).json(testimonialData);
    } catch (error) {
        console.error('Error creating testimonial data:', error.message);
        res.status(500).json({ error: 'Failed to create testimonial data' });
    }
};


// Obtenir toutes les entrées TestimonialData
exports.getAllTestimonialData = async (req, res) => {
    try {
        const testimonialDataList = await TestimonialData.find();

        // Transformer testimonialDataList pour inclure uniquement le nom de fichier pour cover
        const transformedTestimonialDataList = testimonialDataList.map(testimonial => ({
            ...testimonial.toObject(),
            cover: path.basename(testimonial.cover) // Extraire uniquement le nom de fichier
        }));

        res.status(200).json(transformedTestimonialDataList);
    } catch (err) {
        console.error('Error fetching testimonial data:', err.message);
        res.status(500).json({ error: 'Failed to fetch testimonial data' });
    }
};


// Obtenir une entrée TestimonialData spécifique par ID
exports.getTestimonialDataById = async (req, res) => {
    try {
        const testimonialData = await TestimonialData.findById(req.params.id);
        if (!testimonialData) {
            return res.status(404).json({ error: 'Testimonial data not found' });
        }
        res.status(200).json(testimonialData);
    } catch (error) {
        console.error('Error fetching testimonial data by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch testimonial data' });
    }
};

// Mettre à jour une entrée TestimonialData
exports.updateTestimonialData = async (req, res) => {
    try {
        const { name, post, desc } = req.body;
        const updateData = { name, post, desc, updatedAt: Date.now() };

        if (req.file) {
            const testimonialData = await TestimonialData.findById(req.params.id);
            if (testimonialData.cover) {
                fs.unlinkSync(testimonialData.cover); // Supprimer l'ancien fichier cover
            }
            updateData.cover = req.file.path;
        }

        const updatedTestimonialData = await TestimonialData.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedTestimonialData) {
            return res.status(404).json({ error: 'Testimonial data not found' });
        }
        res.status(200).json(updatedTestimonialData);
    } catch (error) {
        console.error('Error updating testimonial data:', error.message);
        res.status(500).json({ error: 'Failed to update testimonial data' });
    }
};

// Supprimer une entrée TestimonialData
exports.deleteTestimonialData = async (req, res) => {
    try {
        const testimonialData = await TestimonialData.findByIdAndDelete(req.params.id);
        if (testimonialData && testimonialData.cover) {
            fs.unlinkSync(testimonialData.cover); // Supprimer le fichier cover
        }
        res.status(200).json({ message: 'Testimonial data deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial data:', error.message);
        res.status(500).json({ error: 'Failed to delete testimonial data' });
    }
};
