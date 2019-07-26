const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    createdAt: String,
    displayName: String,
    givenName: String,
    familyName: String,
    email: String,
    password: String
});

module.exports = model("User", userSchema);
