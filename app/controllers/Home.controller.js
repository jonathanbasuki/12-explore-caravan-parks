/**
 * Renders the home page of the application.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Renders the home page
 */
exports.renderHomePage = (req, res) => {
    res.render('pages/landing/home', {
        title: "Home",
        scripts: []
    });
};

/**
 * Renders the about page of the application.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Renders the about page
 */
exports.renderAboutPage = (req, res) => {
    res.render('pages/landing/about', {
        title: "About Us",
        scripts: []
    });
};