const sql = require('mysql2');
const jwt = require('jsonwebtoken');
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
            const token = jwt.sign(data, process.env.jwtskey, { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600000
            })
            res.send({ data });
        } else {
            res.send({ msg: "usernotexist" });
        }

    })
}
const verifytoken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.jwtskey, (err, decoded) => {
            if (err) {
                console.log("InvalidToken");
                res.send({ msg: "InvalidToken" });
            } else {
                console.log("validToken");
                req.user = decoded;
                next();
            }
        })
    } else {
        console.log("NoToken");
        res.send({ msg: "NoToken" });
    }
}
module.exports = {
    fetchusercredentials,
    verifytoken
}