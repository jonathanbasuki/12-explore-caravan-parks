// Login page route
exports.renderLoginPage = (req, res) => {
    res.render('pages/auth/login', { title: "Login" });
}