const router = require("express").Router();
const { registerVisitor,loginVisitor,forgotPasswordVisitor,resetVisitorPassword , logoutVisitor } = require('../controller/AuthVisitorController');



router.post('/registerVisitor', registerVisitor);
router.post('/loginVisitor', loginVisitor);
router.post('/logoutVisitor', logoutVisitor);


router.post('/forgot-passwordVisitor', forgotPasswordVisitor);
router.post('/reset-passwordVisitor/:token', resetVisitorPassword);

module.exports = router;