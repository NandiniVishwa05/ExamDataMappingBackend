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

const fetchuserdetails = (req, res) => {
    let sql = `select * from userdetail where user_name='${req.params.userid}'`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length == 0) {
            console.log("user not exist");
            res.send({ msg: "newuser" });
        } else {
            res.send({ msg: "olduser" });
        }
    })
}

const insertuserdetail = (req, res) => {
    const { userid, userpassword } = req.body;
    let sql = `insert into userdetail(user_name,user_password,admin_check) values('${userid}','${userpassword}','0')`;
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

const fetchusers = (req, res) => {
    console.log("request is in");
    
    let sql = `SELECT user_name FROM userdetail`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            console.log(data);
            
            res.send({ msg: "usersfetched", data });
        }
    })
}

const deleteuser = (req, res) => {
    console.log(req.params.username);
    
    let sql = `DELETE FROM userdetail where user_name='${req.params.username}'`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else  {
            // console.log(data);
            
            res.send({ msg: "userdeleted" });
        }
    })
}

module.exports = {
    fetchuserdetails,
    insertuserdetail,
    fetchusers,
    deleteuser
}