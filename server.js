const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const engine = require('ejs-mate');

const userRoute = require('./app/routes/User.route.js');
const savedRoute = require('./app/routes/Saved.route.js');
const bookingRoute = require('./app/routes/Booking.route.js');
const homeRoute = require('./app/routes/Home.route.js');

const app = express();
const port = process.env.PORT || 3000;

// Template engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', homeRoute);
app.use(userRoute);
app.use(savedRoute);
app.use(bookingRoute);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server port: ${port}`);
});