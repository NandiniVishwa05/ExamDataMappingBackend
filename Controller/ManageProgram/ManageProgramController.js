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
const insertadminprogramdetail = (req, res) => {
    const { course_name, no_of_semester, no_of_division } = req.body;
    let sql = `insert into courses(course_name,no_of_semester,no_of_division) values('${course_name}',${no_of_semester},${no_of_division})`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.affectedRows > 0) {
            console.log("insertedsuccesfully");
            res.send({ msg: 'insertedsuccesfully' });
        }
    })
}
const fetchadminprogramtabledetails = (req, res) => {
    
    let sql = `select * from courses`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            // console.log(data);
            res.send({ msg: data });
        }
    })
}

const deleteadmintableprogramdetail = (req, res) => {
    // console.log(course_id);
    
    let sql = `DELETE FROM courses where course_id=${req.params.course_id}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else if (data.affectedRows > 0) {
            res.send({ msg: "coursedeleted" });
        }
    });
}
module.exports = {
    insertadminprogramdetail,
    fetchadminprogramtabledetails,
    deleteadmintableprogramdetail
}