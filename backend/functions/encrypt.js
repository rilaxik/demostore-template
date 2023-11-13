const bcrypt = require('bcryptjs')

function encrypt(password) {
    return bcrypt.hashSync(password, 8);
}

function encryptValidate(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {encrypt, encryptValidate}
