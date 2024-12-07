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

const fetchprogramidforreport = (req, res) => {
    const { exam_pattern, course_id, year, division, semester, subject_id } = req.body;
    let sql = `SELECT program_id,subject_code,faculty_name from program where exam_pattern='${exam_pattern}' AND course_id=${course_id} AND year='${year}' AND division='${division}' AND semester='${semester}' AND subject_id=${subject_id}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            console.log(data);
            let sql2 = `SELECT * FROM STUDENT WHERE program_id=${data[0].program_id}`
            db.query(sql2, (err2, data2) => {
                if (err) {
                    console.log(err2);
                } else {
                    console.log(data2);
                
                    res.send({ msg: 'found', data, data2 });
                }
            })

        } else if (data.length === 0) {
            console.log(data);
            res.send({ msg: "notfound" });
        }

    })
}
module.exports = { fetchprogramidforreport }