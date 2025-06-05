const crypto = require('crypto');

function generateCsrfToken() {
    const csrfToken = crypto.randomBytes(32).toString('hex');
    return csrfToken;
}

module.exports = generateCsrfToken;