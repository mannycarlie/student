const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let userSchema = new mongoose.Schema({
    username: { type: String },
    usertype: { type: String },
    password: { type: String }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);