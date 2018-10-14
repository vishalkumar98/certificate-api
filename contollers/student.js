const nodemailer = require('nodemailer');
const Student = require('../models/studentModel');

exports.addStudent = (req, res) => {

    const name = req.body.name;
    const rollno = req.body.rollno;
    const clas = req.body.clas;
    const image = req.body.image;

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    const obj = {
        name, rollno, clas, image, password: text
    };

    Student.create(obj, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
};


exports.getStudents = (req, res) => {
    Student.find({}, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.send(result)
        }
    })
};

exports.uploadDocument = (req, res) => {
    console.log('coming');
    const docname = req.body.docname;
    const doc64 = req.body.documentData;
    const rollno = req.body.rollno;

    const temp = {
        docname: docname,
        doc64: doc64,
        rollno: rollno
    };

    Student.findOne({rollno: rollno}, (err, student) => {
        if (err) {
            res.send(err)
        } else {
            let temp_student = student;
            if (temp_student.docs.length > 0) {
                temp_student.docs.push(temp)
            } else {
                let t = [];
                t.push(temp);
                temp_student['docs'] = t
            }

            Student.findOneAndUpdate({rollno: rollno}, temp_student, (err, success) => {
                if (err) {
                    res.status(501).send(err)
                } else {
                    res.send('Successfully updated')
                }
            })
        }
    })


};

exports.studentLogin = (req, res) => {
    const rollnumber = req.body.rollno;
    const password = req.body.password;

    Student.findOne({rollno: rollnumber}, (err, student) => {
        if (err) {
            res.send(student)
        } else {
            if (student) {
                if (student.password === password) {
                    res.send({
                        error: false,
                        data: 'logged in sucessfully',
                        token: 'qazwsxedcrfvtgbyhnujmikolplokm',
                        rollno: student.rollno
                    })
                } else {
                    res.send({
                        error: true,
                        data: 'Authentication Failed'
                    })
                }
            } else {
                res.send({
                    error: true,
                    data: 'No student found'
                })
            }
        }
    })
};


exports.getOneStudent = (req, res) => {
    const rollno = req.params.id;
    console.log(rollno);

    Student.findOne({rollno: rollno}, (err, student) => {
        if (err) {
            res.send(err)
        } else {
            res.send(student)
        }
    })
};