const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, index: "hashed", required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    job: { type: String, 'default': '' },
    company: { type: String, 'default': '' },
    language: [{ type: String, 'default': 'English' }],
    link: { type: String },
    profileImageLink: { type: String, required: true },
    gitId: { type: String, 'default':"" },
    gittoken: { type: String, 'default': "" }
});

UserSchema.path('email').validate((email) => {
    return email.length;
}, 'have no email');

UserSchema.path('password').validate((password) => {
    return password.length;
}, 'have no email');

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;