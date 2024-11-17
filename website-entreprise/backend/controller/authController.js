const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { Role } = require('../models/Role');

const { generateAccessToken, generateRefreshToken } = require('../midllewares/auth');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const PasswordResetToken = require('../models/PasswordResetToken');
const { generatePassword, hashPassword } = require('../midllewares/passwordUtils');


const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send('Invalid credentials');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const role = await Role.findById(user.role);
  console.log('role id ',role);
  const roleName = role ? role.name : undefined;
  console.log('Role name:', roleName); // Debugging statement

  res.cookie('Cookie_2', accessToken, {
    httpOnly: true, 
    //secure: process.env.NODE_ENV === 'development', 
    sameSite: 'strict', 
    path: '/', 

  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'development', 
    sameSite: 'strict', 
    path: '/', 

  });

  res.cookie('userId', user._id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });

  res.cookie('name', user.username , {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });

  res.cookie('roleName', roleName, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });

  res.json({ accessToken, refreshToken });
};

const token = async (req, res) => {
  const { token } = req.body;
  console.log('token',token);
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, 'your_refresh_token_secret');
    const user = await User.findById(decoded.id).populate('roles');
    if (!user || user.refreshToken !== token) return res.sendStatus(403);

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch {
    res.sendStatus(400);
  }
};




  // Transporter setup for sending emails using Mailtrap
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ffeaa5b1d1ffaa', // Replace with your Mailtrap username
    pass: 'bbba6a5eed480d'  // Replace with your Mailtrap password
  }
});

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email address' });
    }

    // Generate a token using the built-in crypto module
    const token = crypto.randomBytes(20).toString('hex');

    // Create a password reset token entry
    const resetToken = new PasswordResetToken({
      userId: user._id,
      token: token,
      expires: Date.now() + 3600000, // 1 hour
    });
    await resetToken.save();

    // Send email
    const resetLink = `http://localhost:5173/auth/reset-password/${token}`;
    const mailOptions = {
      to: user.email,
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

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

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
      expires: { $gt: Date.now() },
    });

    if (!resetToken) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Trouver le visiteur associé
    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Vérifier que le nouveau mot de passe est différent de l'ancien mot de passe
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password must be different from the old password' });
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Mettre à jour le mot de passe du user
    user.password = hashedPassword;
    await user.save();

    // Supprimer l'entrée du token de réinitialisation
    await PasswordResetToken.deleteOne({ _id: resetToken._id });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// Function to send email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'WebEntreprise@example.com', 
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const registerUser = async (req, res) => {
  const { username, email, role } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const generatedPassword = generatePassword(12); // Generate a password
  const hashedPassword = await hashPassword(generatedPassword); // Hash the generated password

  const newUser = new User({
    username,
    password: hashedPassword, // Store the hashed password
    email,
    role,
  });

  try {
    await newUser.save();
    
    const emailContent = `Welcome ${username},\n\nYour account has been created successfully.\n\nUsername: ${username}\nPassword: ${generatedPassword}\n\nPlease change your password after logging in for the first time.`;
    
    await sendEmail(email, 'Account Created', emailContent); // Send email with username and generated password
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      generatedPassword // Optionally send the generated password to the user (e.g., via email)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const logout = (req, res) => {
  res.clearCookie('Cookie_2', { path: '/'});
  res.clearCookie('refreshToken', { path: '/' });
  res.clearCookie('userId', { path: '/' });
  res.clearCookie('roleName', { path: '/' });
  res.clearCookie('name', { path: '/' });

  res.status(200).json({ message: 'Logged out successfully' });
};
module.exports = { login, token ,registerUser,forgotPassword,resetPassword,logout};
