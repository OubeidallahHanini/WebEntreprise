const router = require("express").Router();
//const { authenticateJWT, authorizeRole } = require('../midllewares/auth');
const { login, token,registerUser,forgotPassword,resetPassword,logout } = require('../controller/authController');




router.post('/login', login);
router.post('/token', token);
router.post('/register', registerUser);
router.post('/logout',logout)



// New forgot password and reset password routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;

