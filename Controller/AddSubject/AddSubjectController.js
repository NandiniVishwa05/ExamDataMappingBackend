const sql = require('mysql2');
const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "marksmapping",
    insecureAuth: true,
    port: 3306
})

const checksubject = (req, res) => {
    let sql = `SELECT * from subjects where subject_name='${req.params.subname}' AND semester='${req.params.semester}' AND course_id=${req.params.courseid}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else if (data.length == 0) {
            let sql2 = `INSERT INTO subjects (subject_name,semester,course_id) values('${req.params.subname}','${req.params.semester}',${req.params.courseid})`
            db.query(sql2, (err2, data2) => {
                if (err2) {
                    console.log(err2);
                    res.send(err2);
                } else if (data2.affectedRows > 0) {
                    console.log(data2);

                    res.send({ msg: "subjectinserted" });
                }
            })
        } else {
            res.send({ msg: "oldsubject" });
        }
    })
}

const fetchallsubjects = (req, res) => {
    let sql = "select subjects.subject_id,subjects.subject_name,subjects.semester,courses.course_name from subjects inner join courses on subjects.course_id = courses.course_id ORDER BY subjects.semester;"
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(data);
        }
    })
}

const deletesubject = (req, res) => {
    let sql = `DELETE FROM subjects where subject_id=${req.params.subjectid}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else if (data.affectedRows > 0) {
            res.send({ msg: "subjectdeleted" });
        }
    });
}

const filterbycourses = (req, res) => {
    let sql;
    if (req.params.semester !== "Select...") {
        sql = `select subjects.subject_id,subjects.subject_name,subjects.semester,courses.course_name from subjects inner join courses on subjects.course_id = courses.course_id where subjects.course_id=${req.params.courseid} AND subjects.semester='${req.params.semester}'`
        // sql = `select * from subjects where course_id=${req.params.courseid} AND semester='${req.params.semester}'`
    } else {
        sql = `select subjects.subject_id,subjects.subject_name,subjects.semester,courses.course_name from subjects inner join courses on subjects.course_id = courses.course_id where subjects.course_id=${req.params.courseid} ORDER BY subjects.semester;`
        // sql = `select * from subjects where course_id=${req.params.courseid}`
    }
    // console.log(sql);

    db.query(sql, (err, data) => {
        if (err) {
            res.send(err);
            console.log(err);

        } else {
            res.send({ msg: "filtersfetched", data });
        }
    })
}

module.exports = {
    checksubject,
    fetchallsubjects,
    deletesubject,
    filterbycourses
}