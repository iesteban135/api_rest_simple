const mongoose = require('mongoose');

// Create a Mongoose schema
const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    birthdate: Date
});

// Register the schema
exports.User = mongoose.model('user', UserSchema);