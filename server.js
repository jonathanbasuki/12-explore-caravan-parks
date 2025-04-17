require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const engine = require('ejs-mate');

const authRoute = require('./app/routes/Auth.route.js');
const userRoute = require('./app/routes/User.route.js');
const savedRoute = require('./app/routes/Saved.route.js');
const bookingRoute = require('./app/routes/Booking.route.js');
const homeRoute = require('./app/routes/Home.route.js');
const campgroundRoutes = require('./app/routes/Campground.route.js');
const campgroundReviewRoutes = require('./app/routes/Review.route.js');
const paymentRoutes = require('./app/routes/Payment.route.js');

const app = express();
const port = process.env.PORT || 3000;

// Template engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'))); // Path to assets images
app.use(express.static(path.join(__dirname, 'src'))); // Path to scripts

// Routing
app.use(authRoute);
app.use(homeRoute);
app.use(userRoute);
app.use(savedRoute);
app.use(bookingRoute);
app.use(campgroundRoutes);
app.use(campgroundReviewRoutes);
app.use(paymentRoutes);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server port: ${port}`);
});