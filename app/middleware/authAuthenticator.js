const jwt = require('jsonwebtoken');

// Middleware: Redirect user if not logged in
exports.authenticateUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Inject decoded user data into request object
        req.user = decoded;

        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

// Middleware: Redirect user if already logged in
exports.redirectIfAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return next();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If valid token, redirect to dashboard
        return res.redirect('/dashboard');
    } catch (err) {
        res.clearCookie('token');
        return next();
    }
};

// Middleware: Inject auth status and user to res.locals for frontend
exports.checkAuthStatus = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.isAuthenticated = false;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.locals.isAuthenticated = true;
        res.locals.user = decoded; // ⬅️ this can now be used in views like: <%= user.username %>

        // Juga injek ke req.user untuk konsistensi
        req.user = decoded;

        next();
    } catch (err) {
        res.locals.isAuthenticated = false;
        res.clearCookie('token');
        next();
    }
};
