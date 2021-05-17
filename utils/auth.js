//redirects user to login if they are not logged in and trying to view restricted content
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    };
};

module.exports = withAuth;