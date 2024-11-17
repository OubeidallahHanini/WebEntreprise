const Service = require('../models/Service');

// Fonction pour créer un nouveau service
exports.createService = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const newService = new Service({ title, subtitle });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error });
  }
};

// Fonction pour obtenir tous les services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

// Fonction pour obtenir un service par ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
};

// Fonction pour mettre à jour un service
exports.updateService = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const service = await Service.findByIdAndUpdate(req.params.id, { title, subtitle }, { new: true });
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// Fonction pour supprimer un service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (service) {
      res.status(200).json({ message: 'Service deleted' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};
