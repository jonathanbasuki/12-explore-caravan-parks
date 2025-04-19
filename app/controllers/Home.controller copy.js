// Home page
exports.renderHomePage = (req, res) => {
    res.render('pages/landing/home', {
        title: "Home",
        scripts: []
    });
};

// About page
exports.renderAboutPage = (req, res) => {
    res.render('pages/landing/about', {
        title: "About Us",
        scripts: []
    });
};