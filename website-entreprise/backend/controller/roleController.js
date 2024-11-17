const { Role } = require('../models/Role');
const { Permission } = require('../models/Permission ');




const getRoles = async (req, res) => {
  try {
    // Fetch all roles and populate their permissions
    const roles = await Role.find().populate('permissions');

    // Respond with the list of roles
    res.status(200).json(roles);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server error', error });
  }
};


const createRole = async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  try {
    const role = await Role.findByIdAndUpdate(id, { name, permissions }, { new: true });
    res.send(role);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await Role.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Fetch single role by ID
const getSingleRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate('permissions');
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { createRole, updateRole, deleteRole ,getRoles,getSingleRole};
