const express = require('express');
const router = express.Router();
const brandSectionController = require('../controller/brandSectionController');

// Routes
router.post('/Createbrandsection', brandSectionController.createBrandSection);
router.get('/Allbrandsection', brandSectionController.getAllBrandSections);
router.get('/brandsection/:id', brandSectionController.getBrandSectionById);
router.put('/Updatebrandsection/:id', brandSectionController.updateBrandSection);
router.delete('/Deletebrandsection/:id', brandSectionController.deleteBrandSection);

module.exports = router;
