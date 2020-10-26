module.exports = function(req, res, next) {
    res.locals.isSuperUser = req.session.superUser;
    res.locals.csrf = req.csrfToken();
    next();
}