const express = require('express');
const sql = require('mysql2');
const numberToWords = require('number-to-words');
const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "marksmapping",
    insecureAuth: true,
    port: 3306
})

const fetchcourses = (req, res) => {
    let sql = `SELECT course_name FROM COURSES`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            res.send(data);
        }
    })
}

const fetchcourseid = (req, res) => {
    let sql = `SELECT course_id FROM COURSES where course_name="${req.params.coursename}"`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            res.send(data);
        }
    })
}

const fetchsubjects = (req, res) => {
    let sql = `SELECT subject_name FROM subjects where course_id=${req.params.courseid} AND semester="${req.params.semester}"`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            res.send(data);
        }
    })
}

const fetchsubjectid = (req, res) => {
    let sql = `SELECT subject_id FROM subjects where subject_name="${req.params.subjectname}"`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            res.send(data);
        }
    })
}

const overrideprogramdata = (req, res) => {
    const { program_id, exam_pattern, course_id, year, division, semester, subject_id, subject_code, faculty_name } = req.body;
    console.log(year);
    let sql = `REPLACE INTO PROGRAM (program_id,exam_pattern,course_id,year,division,semester,subject_id,subject_code,faculty_name) VALUES(${program_id},'${exam_pattern}',${course_id},'${year}','${division}','${semester}',${subject_id},'${subject_code}','${faculty_name}')`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.affectedRows > 0) {
            console.log(data);
            res.send({ msg: "Inserted" });
        }

    })
}

const insertprogramdata = (req, res) => {
    const { exam_pattern, course_id, year, division, semester, subject_id, subject_code, faculty_name } = req.body;
    console.log(year);
    let sql = `INSERT INTO PROGRAM (exam_pattern,course_id,year,division,semester,subject_id,subject_code,faculty_name) VALUES('${exam_pattern}',${course_id},'${year}','${division}','${semester}',${subject_id},'${subject_code}','${faculty_name}')`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.affectedRows > 0) {
            console.log(data);
            res.send({ msg: "Inserted" });
        }

    })
}

const fetchprogramid = (req, res) => {
    const { exam_pattern, course_id, year, division, semester, subject_id, subject_code, faculty_name } = req.body;
    let sql = `SELECT program_id from program where exam_pattern='${exam_pattern}' AND course_id=${course_id} AND year='${year}' AND division='${division}' AND semester='${semester}' AND subject_id=${subject_id} AND subject_code='${subject_code}' AND faculty_name='${faculty_name}'`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            console.log(data);
            res.send({ msg: 'found', data });
        } else if (data.length === 0) {
            console.log(data);
            res.send({ msg: "notfound" });
        }

    })
}

const insertmarksdetail = (req, res) => {
    let { rno, qone, qtwo, qthree, qfour, qfive, program_id } = req.body;
    rno = parseInt(rno)
    qone = parseInt(qone)
    qtwo = parseInt(qtwo)
    qthree = parseInt(qthree)
    qfour = parseInt(qfour)
    qfive = parseInt(qfive)
    program_id = parseInt(program_id)
    let total = qone + qtwo + qthree + qfour + qfive;
    let inwords = numberToWords.toWords(total);
    let sql = `REPLACE INTO STUDENT(student_rollno,q1,q2,q3,q4,q5,total,total_in_words,program_id) VALUES(${rno},${qone},${qtwo},${qthree},${qfour},${qfive},${total},'${inwords}',${program_id})`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.affectedRows > 0) {
            console.log(data);
            res.send({ msg: "Inserted marks" });
        }

    })
}
module.exports = { fetchcourses, fetchcourseid, fetchsubjects, fetchsubjectid, overrideprogramdata, insertprogramdata, fetchprogramid, insertmarksdetail };