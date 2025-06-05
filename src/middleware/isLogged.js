
const IsLogged = function (req, res, next) {
    console.log(req?.session.userId)
    if(!req?.session.userId) return res.redirect('/users/login');
    next();
}

module.exports = IsLogged;