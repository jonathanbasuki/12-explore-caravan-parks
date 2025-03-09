const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user_route');
const savedRoute = require('./routes/saved_route');
const bookingRoute = require('./routes/booking_route');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routing
app.use(userRoute);
app.use(savedRoute);
// app.use(bookingRoute);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server port: ${port}`);
});