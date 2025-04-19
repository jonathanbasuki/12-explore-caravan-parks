/**
 * Page controller functions for rendering static pages.
 * @module controllers/Page
 */

/**
 * Renders the home page.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Renders the 'home' page with the title "Campervan".
 */
exports.renderHomePage = (req, res) => {
    res.render('pages/home', { title: "Campervan" });
};

/**
 * Renders the about page.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Renders the 'about' page with the title "About Us".
 */
exports.renderAboutPage = (req, res) => {
    res.render('pages/about', { title: "About Us" });
};
