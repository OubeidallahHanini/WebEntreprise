// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { createContact, listContacts, getContactDetails, updateContact, deleteContact } = require('../controller/ContactController');

// Créer un contact
router.post('/CreateContact', createContact);

// Lister tous les contacts
router.get('/AllContact', listContacts);

// Obtenir les détails d'un contact spécifique par ID
router.get('/Contact/:contactId', getContactDetails);

// Mettre à jour un contact spécifique par ID
router.put('/UpdateContact/:contactId', updateContact);

// Supprimer un contact spécifique par ID
router.delete('/DeleteContact/:contactId', deleteContact);

module.exports = router;
