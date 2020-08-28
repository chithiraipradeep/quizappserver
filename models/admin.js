const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },    
     password: { type: String, required: true },
});

AdminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Admin", AdminSchema);