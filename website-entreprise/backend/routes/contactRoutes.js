const express = require('express');
const router = express.Router();
const { createContact, listContacts, getContactDetails, updateContact, deleteContact, listBusinessContacts, listComplaintContacts } = require('../controller/contactController');
const { authorizeRole } = require('../midllewares/auth'); 

// Créer un contact
router.post('/contacts', createContact);

// Lister tous les contacts
router.get('/contacts', listContacts);
// Lister tous les contacts
router.get('/contactsBusiness', authorizeRole(['superadmin', 'admin','Sales Manger'], 'read'), listBusinessContacts);

router.get('/contactsComplaint', authorizeRole(['superadmin', 'admin','Sales Manger'], 'read'),listComplaintContacts)

// Obtenir les détails d'un contact spécifique par ID
router.get('/contacts/:contactId', authorizeRole(['superadmin', 'admin','Sales Manger'], 'read'), getContactDetails);

// Mettre à jour un contact spécifique par ID
router.put('/contacts/:contactId', authorizeRole(['superadmin', 'admin','Sales Manger'], 'update'), updateContact);

// Supprimer un contact spécifique par ID
router.delete('/contacts/:contactId', authorizeRole(['superadmin', 'admin','Sales Manger'], 'delete'), deleteContact);

module.exports = router;