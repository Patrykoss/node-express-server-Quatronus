const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

exports.hashPassword = (passPlain) => {
    return bcrypt.hashSync(passPlain, salt);
}

exports.comparePassword = (passPlain, passHash) => {
    return bcrypt.compareSync (passPlain, passHash);
}