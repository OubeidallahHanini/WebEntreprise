
const express = require('express');
const router = express.Router();

const {
    createBlogData,
    getAllBlogData,
    getBlogDataById,
    updateBlogData,
    deleteBlogData
  } = require('../controller/BlogDataController');
  const upload = require('../midllewares/uploadMiddleware'); // Corrigez le chemin si nécessaire



// Route pour créer une nouvelle entrée BlogData
router.post('/Createblog',upload.single('cover') ,createBlogData);

// Route pour obtenir toutes les entrées BlogData
router.get('/Allblog', getAllBlogData);

// Route pour obtenir une entrée BlogData spécifique par ID
router.get('/blog/:id', getBlogDataById);

// Route pour mettre à jour une entrée BlogData spécifique par ID
router.put('/blog/:id',upload.single('cover') ,updateBlogData);

// Route pour supprimer une entrée BlogData spécifique par ID
router.delete('/blog/:id', deleteBlogData);

module.exports = router;
