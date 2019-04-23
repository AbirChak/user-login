const mongoose = require('mongoose');

const userScheMa = mongoose.Schema({
    id : Int16Array,
    userName : String,
    password : Sring,
    status : Int16Array
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);