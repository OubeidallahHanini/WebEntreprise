const express = require('express');
const router = express.Router();
const showcaseSectionController = require('../controller/showcaseSectionController');

// Routes CRUD pour ShowcaseSection
router.get('/AllShowCaseSection', showcaseSectionController.getAllShowcaseSections);
router.get('/ShowCaseSection/:id', showcaseSectionController.getShowcaseSectionById);
router.post('/CreateShowCaseSection', showcaseSectionController.createShowcaseSection);
router.put('/UpdateShowCaseSection/:id', showcaseSectionController.updateShowcaseSectionById);
router.delete('/DeleteShowCaseSection/:id', showcaseSectionController.deleteShowcaseSectionById);

module.exports = router;
