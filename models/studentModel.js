const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    name: String,
    clas: String,
    rollno: String,
    image: String,
    password: String,
    docs: []
});

module.exports = mongoose.model('student', Student);