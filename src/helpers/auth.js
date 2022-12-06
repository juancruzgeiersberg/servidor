const helper = {};

helper.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'No has ingresado, por favor ingresa con tu usuario.');
    res.redirect('/users/signin');
};

module.exports = helper;