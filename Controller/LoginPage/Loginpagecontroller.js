const sql = require('mysql2');
const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "marksmapping",
    insecureAuth: true,
    port: 3306
})

const fetchusercredentials = (request, res) => {
    console.log(request.params.userid);

    let sql = `select admin_check from userdetail where user_name='${request.params.userid}' and user_password='${request.params.userpassword}';`
    db.query(sql, (err, data) => {
        if (err) {
            console.log("hello");
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            res.send({ data });
        } else {
            res.send({ msg: "usernotexist" });
        }

    })
}
module.exports = {
    fetchusercredentials
}