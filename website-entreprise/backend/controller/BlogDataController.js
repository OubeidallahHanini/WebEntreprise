const path = require('path');
const fs = require('fs');
const multer = require('multer');
const BlogData = require('../models/BlogData');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Dossier de stockage des fichiers
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Nom de fichier unique
  },
});

const upload = multer({ storage });

// Créer une nouvelle entrée BlogData
const createBlogData = async (req, res) => {
  try {
    // Log the entire request body and file
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    // Check if req.file is present
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract fields from request body
    const { title, category, date } = req.body;
    const cover = req.file.path;

    if (!title || !cover || !category || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new blogData object
    const blogData = new BlogData({ title, cover, category, date: new Date(date) });

    // Save the blog data to the database
    await blogData.save();
    res.status(201).json(blogData);
  } catch (error) {
    console.error('Error creating blog data:', error.message);
    res.status(500).json({ error: 'Failed to create blog data' });
  }
};

// Obtenir toutes les entrées BlogData
const getAllBlogData = async (req, res) => {
  try {
    const blogDataList = await BlogData.find();
    // Transform blogDataList to include only filename for cover
    const transformedBlogDataList = blogDataList.map(blog => ({
      ...blog.toObject(),
      cover: path.basename(blog.cover) // Extract only the filename
    }));
    res.status(200).json(transformedBlogDataList);
  } catch (error) {
    console.error('Error fetching blog data:', error.message);
    res.status(500).json({ error: 'Failed to fetch blog data' });
  }
};

// Obtenir une entrée BlogData spécifique par ID
const getBlogDataById = async (req, res) => {
  try {
    const blogData = await BlogData.findById(req.params.id);
    if (!blogData) {
      return res.status(404).json({ error: 'Blog data not found' });
    }
    res.status(200).json(blogData);
  } catch (error) {
    console.error('Error fetching blog data:', error.message);
    res.status(500).json({ error: 'Failed to fetch blog data' });
  }
};

// Mettre à jour une entrée BlogData
const updateBlogData = async (req, res) => {
  try {
    const { title, category, date } = req.body;
    const updateData = { title, category, date: new Date(date), updatedAt: Date.now() };

    // Check if a file is uploaded
    if (req.file) {
      const blogData = await BlogData.findById(req.params.id);
      if (blogData.cover) {
        fs.unlinkSync(blogData.cover); // Remove the old cover file
      }
      updateData.cover = req.file.path;
    }

    const updatedBlogData = await BlogData.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedBlogData) {
      return res.status(404).json({ error: 'Blog data not found' });
    }
    res.status(200).json(updatedBlogData);
  } catch (error) {
    console.error('Error updating blog data:', error.message);
    res.status(500).json({ error: 'Failed to update blog data' });
  }
};

// Supprimer une entrée BlogData
const deleteBlogData = async (req, res) => {
  try {
    const blogData = await BlogData.findByIdAndDelete(req.params.id);
    if (blogData.cover) {
      fs.unlinkSync(blogData.cover); // Remove the cover file
    }
    res.status(200).json({ message: 'Blog data deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog data:', error.message);
    res.status(500).json({ error: 'Failed to delete blog data' });
  }
};

module.exports = { createBlogData, getAllBlogData, getBlogDataById, updateBlogData, deleteBlogData };
