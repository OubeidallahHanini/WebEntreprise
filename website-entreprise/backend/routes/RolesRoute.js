const express = require('express');
const {  authorizeRole } = require('../midllewares/auth');

const { createRole, updateRole, deleteRole,getRoles, getSingleRole } = require('../controller/roleController');

const router = express.Router();


router.get('/roles', authorizeRole('superadmin', 'read'), getRoles);
router.post('/roles', authorizeRole('superadmin', 'write'),  createRole);


router.put('/roles/:id',  authorizeRole('superadmin','update'), updateRole);
router.delete('/roles/:id', authorizeRole('superadmin','delete'), deleteRole);
router.get('/roles/:id', authorizeRole('superadmin','read'), getSingleRole);




//router.post('/permissions', createPermission);

module.exports = router;
