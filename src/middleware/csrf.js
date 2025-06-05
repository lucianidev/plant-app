const crypto = require('crypto');
const generateCSRF = require('../helpers/generateCSRF');
const csrf = function (req, res, next) {
    if(!req.query?.csrf && typeof(req.query?.csrf) !== 'string') return res.redirect('/plants?error=6');
    if(req.session.csrf !== req.query.csrf) return res.redirect('/plants?error=6');
    req.session.csrf = generateCSRF();
    next();
}

module.exports = csrf;