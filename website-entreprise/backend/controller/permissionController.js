const {Permission} = require('../models/Permission ');





const createPermission = async (req, res) => {
    const { name } = req.body;
  
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Valid permission name is required' });
    }
  
    try {
      console.log('Creating permission with name:', name); // Debug log
      const permission = new Permission({ name });
      console.log('Permission instance created:', permission); // Debug log
      await permission.save();
      res.status(201).json(permission);
    } catch (error) {
      console.error('Error creating permission:', error.message); // Log specific error message
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };



const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updatePermission = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Permission name is required' });
    }
  
    try {
      const permission = await Permission.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
      );
  
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
  
      res.status(200).json(permission);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const deletePermission = async (req, res) => {
    const { id } = req.params;
  
    try {
      const permission = await Permission.findByIdAndDelete(id);
  
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
  
      res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const getSinglePermission = async (req, res) => {
    const { id } = req.params;
    try {
      const permission = await Permission.findById(id);
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
      res.json(permission);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  module.exports = {
    getPermissions,
    updatePermission,
    deletePermission,
    createPermission,
    getSinglePermission
  };