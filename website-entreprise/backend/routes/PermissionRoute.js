const express = require('express');
const { getPermissions, updatePermission, deletePermission, createPermission, getSinglePermission } = require('../controller/permissionController'); 
const { authorizeRole } = require('../midllewares/auth'); 

const router = express.Router();

router.post('/permissions',  createPermission);


router.get('/permissions', authorizeRole(['superadmin', 'admin'], 'read'), getPermissions);

router.put('/permissions/:id',  authorizeRole('superadmin', 'update'), updatePermission);

router.delete('/permissions/:id',  authorizeRole('superadmin', 'delete'), deletePermission);

router.get('/permissions/:id',  authorizeRole('superadmin', 'update'), getSinglePermission);


module.exports = router;
