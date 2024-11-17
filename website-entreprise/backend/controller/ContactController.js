// controllers/contactController.js
const Contact = require('../models/Contact');

// Créer un nouveau contact
const createContact = async (req, res) => {
  const { name, email, phone, subject, message, type } = req.body;

  try {
    const newContact = new Contact({ name, email, phone, subject, message, type });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lister tous les contacts
const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Obtenir les détails d'un contact par ID
const getContactDetails = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Mettre à jour un contact
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, subject, message, type } = req.body;

  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone, subject, message, type },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Supprimer un contact
const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createContact, listContacts, getContactDetails, updateContact, deleteContact };
