require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const { checkAuthStatus } = require('./app/middleware/authAuthenticator');

const authRoute = require('./app/routes/Auth.route.js');
const homeRoute = require('./app/routes/Home.route.js');
const exploreRoute = require('./app/routes/Explore.route.js');
const dashboardRoute = require('./app/routes/Dashboard.route.js');
const userRoute = require('./app/routes/User.route.js');
const savedRoute = require('./app/routes/Saved.route.js');
const bookingRoute = require('./app/routes/Booking.route.js');
const campgroundRoutes = require('./app/routes/Campground.route.js');
const campgroundReviewRoutes = require('./app/routes/Review.route.js');

const app = express();

// Template engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

app.use(session({
    secret: "kelompok-12-soa",
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')[0] || null;
    res.locals.error_msg = req.flash('error_msg')[0] || null;
    next();
});

// Auth middleware
app.use(checkAuthStatus);
app.use(methodOverride('_method'));

// Model associations
require('./app/models/associations.js');

// Routing
app.use(authRoute);
app.use(homeRoute);
app.use(exploreRoute);
app.use(dashboardRoute);
app.use(userRoute);
app.use(savedRoute);
app.use(bookingRoute);
app.use(campgroundRoutes);
app.use(campgroundReviewRoutes);

module.exports = app;