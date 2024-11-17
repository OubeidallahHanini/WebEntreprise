const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, listUsers, getUserDetails ,getUserDetails1, getUserInformations, updateUserInfo } = require('../controller/userController');
const {  authorizeRole ,authorizeUserModification} = require('../midllewares/auth');
const upload = require('../midllewares/uploadMiddleware');




// Update user - only the logged-in user can update their profile
router.put('/users/:userId' , authorizeUserModification(['superadmin'], 'update'), upload.single('photo'), updateUser);

// Delete user - only superadmin can delete users
router.delete('/users/:userId', authorizeRole('superadmin', 'delete'), deleteUser);

// List users - superadmin and admin can list users
router.get('/users', authorizeRole(['superadmin', 'admin'], 'read'), listUsers);

// Get user details - superadmin and admin can view user details
router.get('/users/:userId', authorizeRole(['superadmin', 'admin'], 'read'), getUserDetails);

router.get('/user-info', getUserDetails1);

router.get('/user-info/:userId',getUserInformations) ;
router.put('/user-info/:userId' , upload.single('photo'), updateUserInfo);




module.exports = router;
