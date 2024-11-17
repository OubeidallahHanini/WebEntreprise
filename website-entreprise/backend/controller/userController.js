const{User} = require('../models/User') ;
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');


const listUsers = async (req, res) => {
    try {
      const users = await User.find().populate('role');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

  const getUserDetails = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId).populate('role');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Transform user to include only the filename for the photo
      const transformedUser = {
        ...user.toObject(),
        photo: user.photo ? path.basename(user.photo) : null
      };
  
      res.status(200).json(transformedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };


 

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, role, password,address,numtel } = req.body;
    
    console.log('Requesting User ID:', req.user.id);
  
    // Password complexity check
    const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  
    if (password && !passwordComplexityRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and special characters' });
    }
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update fields
      if (username) user.username = username;
      if (email) user.email = email;
      if (role) user.role = role;
      if (address) user.address=address ;
      if(numtel) user.numtel=numtel ;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }
      
      // Update photo if available
      if (req.file) {
        user.photo = req.file.path; // Update the photo field with the file path
      }
  
      // Save updated user
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
 
  

  const deleteUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete user photo from server
      if (user.photo) {
        fs.unlink(path.join(__dirname, '..', user.photo), (err) => {
          if (err) {
            console.error('Error deleting user photo:', err);
          }
        });
      }
  
      // Delete user
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

  
  const getUserDetails1 = async (req, res) => {
    const { userId, roleName } = req.cookies; // Get cookies from the request
    if (!userId) {
      return res.status(401).json({ message: 'No user ID provided' });
    }
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        userID : user.id,
        name: user.username,
        role: roleName, 
        photo: user.photo ? path.basename(user.photo) : null, // Get the basename of the photo

      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

  const getUserInformations = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId).populate('role');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Transform user to include only the filename for the photo
      const transformedUser = {
        ...user.toObject(),
        photo: user.photo ? path.basename(user.photo) : null
      };
  
      res.status(200).json(transformedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };


  const updateUserInfo = async (req, res) => {
    const { userId } = req.params;
    const { username,  role, password ,address,numtel} = req.body;
    
    //console.log('Requesting User ID:', req.user.id);
  
    // Password complexity check
    const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  
    if (password && !passwordComplexityRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and special characters' });
    }
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update fields
      if (username) user.username = username;
     
      if (role) user.role = role;
      if (address) user.address = address;
      if (numtel) user.numtel = numtel;



      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }
      
      // Update photo if available
      if (req.file) {
        user.photo = req.file.path; // Update the photo field with the file path
      }
  
      // Save updated user
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  module.exports = { updateUser, deleteUser, listUsers, getUserDetails,getUserDetails1,getUserInformations,updateUserInfo } ;
  