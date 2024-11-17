const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../midllewares/auth');
const { Visitor } = require('../models/Visitor');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const PasswordResetToken = require('../models/PasswordResetToken');





const registerVisitor = async (req, res) => {
    const { username, password, email } = req.body;
    console.log("wesh"+req.body)
  
    // Validate input
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    } 

    // A TESTER JE LAI RAJOUTER SANS TESTER 
    const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordComplexityRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and special characters' });
    }

    
  
    // Check if Visiteur already exists
    const existingVisitor = await Visitor.findOne({ username });
    if (existingVisitor) {
      return res.status(400).json({ message: 'Visitor already exists' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create and save the new visiteur
    const newVisitor = new Visitor({
      username,
      password: hashedPassword,
      email
    });
    console.log(newVisitor);
  
    try {
      await newVisitor.save();
      res.status(201).json({ message: 'Visitor registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };


  const loginVisitor = async (req, res) => {
    const { email, password } = req.body;
    const visitor = await Visitor.findOne({ email });
    if (!visitor) return res.status(401).send('Invalid credentials');
  
    const isMatch = await bcrypt.compare(password, visitor.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');
  
    const accessToken = generateAccessToken(visitor);
    const refreshToken = generateRefreshToken(visitor);
  
    res.cookie('Cookie_1', accessToken, {
      httpOnly: true, 
      // secure: process.env.NODE_ENV === 'development', 
      sameSite: 'strict', 
      path: '/', 
  
    });
   user = visitor 
  
    res.json({ accessToken, refreshToken , user });
    console.log(user)
    console.log(accessToken,refreshToken)
  };



  
  // Transporter setup for sending emails using Mailtrap
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '19f84c9d7bc914', // Replace with your Mailtrap username
      pass: '6eb945f44bf512'  // Replace with your Mailtrap password
    }
  });
  
  
  
  
  
  
  
  
  const forgotPasswordVisitor = async (req, res) => {
    const { email } = req.body;

  try {
    const visitor = await Visitor.findOne({ email });
    if (!visitor) {
      return res.status(404).json({ message: 'No visitor found with this email address' });
    }

    // Generate a token using the built-in crypto module
    const token = crypto.randomBytes(20).toString('hex');



    console.log(token)

    // Create a password reset token entry
    const resetToken = new PasswordResetToken({
        userId: visitor._id,
        token: token,
        expires: new Date(Date.now() + 3* 3600000) // 3 heures
      });
      
    await resetToken.save();

    // Send email
    // const resetLink = `http://localhost:3005/api/reset-passwordVisitor/${token}`;
    const resetLink = `http://localhost:3000/resetPassword/${token}`;

    const mailOptions = {
      to: visitor.email,
      from: 'WebEntreprise@example.com', 
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested to reset your password.\n\n
      Please click on the following link, or paste it into your browser to complete the process:\n\n
      ${resetLink}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending email', error: err });
      }
      res.status(200).json({ message: 'Email sent successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  };





const resetVisitorPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  console.log( confirmPassword)
  console.log(token)

  // Vérifier que les mots de passe correspondent
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Vérifier que le nouveau mot de passe est différent de l'ancien
  const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  if (!passwordComplexityRegex.test(newPassword)) {
    return res.status(400).json({ message: 'Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and special characters' });
  }

  try {
    // Trouver le token de réinitialisation de mot de passe
    const resetToken = await PasswordResetToken.findOne({
        token: token,
        expires: { $gt: Date.now() }, // Vérifie si le token n'est pas expiré
      });

    console.log(resetToken)

    if (!resetToken) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired ' });
    }

    // Trouver le visiteur associé
    const visitor = await Visitor.findById(resetToken.userId);

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    console.log(visitor)

    // Vérifier que le nouveau mot de passe est différent de l'ancien mot de passe
    const isSamePassword = await bcrypt.compare(newPassword, visitor.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password must be different from the old password' });
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Mettre à jour le mot de passe du visiteur
    visitor.password = hashedPassword;
    await visitor.save();

    // Supprimer l'entrée du token de réinitialisation
    await PasswordResetToken.deleteOne({ _id: resetToken._id });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const logoutVisitor = async (req, res) => {
  res.clearCookie('Cookie_1', {
    httpOnly: true, 
    sameSite: 'strict', 
    path: '/', 
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


  










  module.exports = { registerVisitor , loginVisitor , resetVisitorPassword , forgotPasswordVisitor , logoutVisitor };

