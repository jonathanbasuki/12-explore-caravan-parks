// Home page
exports.getHomePage = (req, res) => {
    res.render('pages/home', { title: "Campervan" });
};

// About page
exports.getAboutPage = (req, res) => {
    res.render('pages/about', { title: "About Us" });
};