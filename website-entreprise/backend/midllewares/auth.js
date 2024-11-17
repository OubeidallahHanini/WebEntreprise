
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const {Role} = require('../models/Role')  ;
const {Permission} = require('../models/Permission ')  ;



passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username }).populate('role');
      if (!user) return done(null, false);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role}, 'your_access_token_secret', { expiresIn: '59m' });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user._id }, 'your_refresh_token_secret', { expiresIn: '7d' });
  user.refreshToken = refreshToken;
  user.save();
  return refreshToken;
};

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.Cookie_1;
  if (!token) return res.sendStatus(403);

  jwt.verify(token, 'your_access_token_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });

};

const authorizeRole = (requiredRoles, requiredPermission) => async (req, res, next) => {
  const token = req.cookies.Cookie_2; // Get the token from cookies
  console.log('token',token);
  if (!token) {
    console.log('token',token);
    return res.status(403).json({ message: 'No token providedddd' });
  }

  try {
    const decoded = jwt.verify(token, 'your_access_token_secret'); // Verify the token
    const roleId = decoded.role; // Get the role ID from the decoded token
    const userId = decoded.id; // Get the user ID from the decoded token


    // Debugging output
    console.log('User Id :',userId);
    console.log('Decoded Token:', JSON.stringify(decoded, null, 2));
    console.log('Role ID from Token:', roleId);
    console.log('Required Roles:', requiredRoles);

    if (!roleId) {
      return res.status(403).json({ message: 'No role in token' });
    }

    // Fetch the role from the database using the role ID
    const role = await Role.findById(roleId).populate('permissions');

    if (!role) {
      return res.status(403).json({ message: 'Role not found' });
    }

    const userRoleName = role.name; // Get the role name
    const hasRole = requiredRoles.includes(userRoleName);

    // Check for required permission
    const hasPermission = role.permissions.some(permission => permission.name === requiredPermission);

    // Debugging output
    console.log('User Role Name:', userRoleName);
    console.log('Has Role:', hasRole);
    console.log('Has Permission:', hasPermission);

    if (hasRole && hasPermission) {
      req.user = decoded; // Attach the decoded token payload to request object
      next();
    } else {
      res.status(403).json({ message: 'Insufficient role or permission', userRoleName, requiredRoles, requiredPermission });
    }
  } catch (error) {
    res.status(403).json({ message: 'Invalid token', error });
  }
};



const authorizeUserModification = (requiredRoles, requiredPermission) => async (req, res, next) => {
  const token = req.cookies.Cookie_2; // Get the token from cookies

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_access_token_secret'); // Verify the token
    const roleId = decoded.role; // Get the role ID from the decoded token
    const userId = decoded.id; // Get the user ID from the decoded token

    // Debugging output
    console.log('Decoded Token:', JSON.stringify(decoded, null, 2));
    console.log('Role ID from Token:', roleId);
    console.log('User ID from Token:', userId);
    console.log('Required Roles:', requiredRoles);

    if (!roleId || !userId) {
      return res.status(403).json({ message: 'Invalid token payload' });
    }

    // Fetch the role from the database using the role ID
    const role = await Role.findById(roleId).populate('permissions');

    if (!role) {
      return res.status(403).json({ message: 'Role not found' });
    }

    const userRoleName = role.name; // Get the role name
    const hasRole = requiredRoles.includes(userRoleName);

    // Check for required permission
    const hasPermission = role.permissions.some(permission => permission.name === requiredPermission);

    // Check if the user can modify their profile or if the user is a superadmin
    const canModifyProfile = (hasRole && hasPermission) || (req.user.id === req.params.userId);

    // Debugging output
    console.log('User Role Name:', userRoleName);
    console.log('Has Role:', hasRole);
    console.log('Has Permission:', hasPermission);
    console.log('Can Modify Profile:', canModifyProfile);

    if (canModifyProfile) {
      req.user = decoded; // Attach the decoded token payload to request object
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized to modify this profile', userRoleName, requiredRoles, requiredPermission });
    }
  } catch (error) {
    res.status(403).json({ message: 'Invalid token', error });
  }
};

module.exports = { authenticateJWT, authorizeRole, generateAccessToken, generateRefreshToken, authorizeUserModification };
