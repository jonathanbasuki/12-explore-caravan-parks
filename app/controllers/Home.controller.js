// Home page
exports.renderHomePage = (req, res) => {
    res.render('pages/home', { title: "Campervan" });
};

// About page
exports.renderAboutPage = (req, res) => {
    res.render('pages/about', { title: "About Us" });
};