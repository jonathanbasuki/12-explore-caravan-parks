const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate the user based on JWT token stored in cookies.
 * If token is missing or invalid, user is redirected to the login page.
 *
 * @function authenticateUser
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
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

/**
 * Middleware to redirect authenticated users away from pages like login or register.
 * If a valid token is found, redirects the user to the dashboard.
 *
 * @function redirectIfAuthenticated
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
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

/**
 * Middleware to check authentication status and make it available to views.
 * Sets `res.locals.isAuthenticated` and `res.locals.user` for template rendering.
 * Also injects user into `req.user` for consistency in backend access.
 *
 * @function checkAuthStatus
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
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

        // Also inject into req.user for backend consistency
        req.user = decoded;

        next();
    } catch (err) {
        res.locals.isAuthenticated = false;
        res.clearCookie('token');
        next();
    }
};
