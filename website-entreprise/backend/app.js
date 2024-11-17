const express = require("express");
const connectToDb = require("./config/connecttodb");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

// Middleware pour analyser le corps des requêtes JSON
app.use(bodyParser.json());

// Middleware pour analyser les cookies
app.use(cookieParser());

// Middleware pour initialiser Passport (si utilisé)
app.use(passport.initialize());

// Configuration de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Permet d'envoyer les cookies
};

// Utilisation de CORS
app.use(cors(corsOptions));

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Routes API
app.use('/api', require("./routes/AuthRoute"));
app.use('/api', require("./Routes/RolesRoute"));
app.use('/api', require("./routes/PermissionRoute"));
app.use('/api', require("./routes/UserRoute"));
app.use('/api', require("./routes/VisitorRoute"));
app.use('/api', require("./routes/AuthVisitorRoute"));
app.use('/api', require("./routes/ContactRoute"));
app.use('/api', require("./routes/heroDataRoutes"));
app.use('/api', require("./routes/ExpertiseRoute"));
app.use('/api/', require("./routes/BannerDataRoute"));
app.use('/api', require("./routes/BlogDataRoute"));
app.use('/api', require("./routes/expertiseSectionRoutes"));
app.use('/api', require("./routes/testimonialRoutes"));
app.use('/api',require("./routes/showcaseSectionRoutes"));
app.use('/api',require("./routes/ShowcaseDataRoutes"));
app.use('/api',require("./routes/brandSectionRoutes"));
app.use('/api',require("./routes/brandRoutes"));
app.use('/api',require("./routes/teamSectionRoutes"));
app.use('/api',require("./routes/teamRoutes"));
app.use('/api',require("./routes/agencyRoutes"));
app.use('/api',require("./routes/footerRoutes") );
app.use('/api',require("./routes/serviceRoutes") );

















app.use('/photos', express.static(path.join(__dirname, 'photos')));     




// app.use('/photos', express.static(path.join(__dirname, 'photos')));












// Connexion à la base de données
connectToDb();

// Démarrage du serveur
const PORT = process.env.PORT || 3005;
app.listen(PORT, () =>
  console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`)
);
