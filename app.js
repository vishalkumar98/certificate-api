const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

//controllers
const student = require('./contollers/student');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://vishalkumar98:Vishal98@ds123963.mlab.com:23963/certificate', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());


// admin login
app.post('/admin/login', (req, res) => {
    username = req.body.username;
    password = req.body.password;

    if (username === 'admin' && password === '123456') {
        res.send({
            error: false,
            message: 'Successfully logged in',
            token: 'qwertyuiopasdfghjklzxcvbnm123456789'
        })
    } else {
        res.status(400).send({
           error: true,
           message: 'Authentication failed'
        })
    }
});

// add student
app.post('/admin/addstudent', student.addStudent);

// get all students
app.get('/admin/getstudents', student.getStudents);

// upload student document
app.post('/admin/upload', student.uploadDocument);

// student login
app.post('/student/login', student.studentLogin);

// get one student
app.get('/student/:id', student.getOneStudent);

// Delete student
app.delete('/student/:id', student.deleteOneStudent)

app.listen(3000);