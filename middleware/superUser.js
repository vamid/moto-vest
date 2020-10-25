module.exports = function(req,res,next) {
    if (!req.session.superUser) {
        return res.redirect('/');
    }
    next();
}