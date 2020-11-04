const bcrypt = require("bcryptjs");
// let { genSalt, hash, compare } = bcrypt;
// const { promisify } = require("util");

module.exports.hash = (password) => {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
};

module.exports.compare = bcrypt.compare;
