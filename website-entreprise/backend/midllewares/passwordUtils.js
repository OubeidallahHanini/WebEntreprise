const bcrypt = require('bcrypt');

function generatePassword(length) {
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&()_+[]{}|;:,.<>?';
  const allChars = upperCaseChars + lowerCaseChars + numberChars + specialChars;

  if (length < 12) {
    throw new Error('Le mot de passe doit contenir au moins 12 caractères.');
  }

  let password = '';
  password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  password += numberChars[Math.floor(Math.random() * numberChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Mélanger les caractères du mot de passe
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  return password;
}

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

module.exports = { generatePassword, hashPassword };
