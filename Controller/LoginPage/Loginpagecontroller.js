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

    let sql = `select * from userdetail where user_name='${request.params.userid}' and user_password='${request.params.userpassword}';`
    db.query(sql, (err, data) => {
        if (err) {
            console.log("hello");
            console.log(err);
            res.send("error");
        } else if (data.length > 0) {
            const token = jwt.sign(data[0], process.env.jwtskey, { expiresIn: "1h" });
            console.log(token);
            res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 });
            res.send({ data, token });
        } else {
            res.send({ msg: "usernotexist" });
        }

    })
}
function verifytoken(req, res, next) {
    const token = req.cookies.token;
    // console.log(req.cookies.token);

    if (token) {
        jwt.verify(token, process.env.jwtskey, (err, decoded) => {
            if (err) {
                console.log("InvalidToken");
                res.status(401).send({ msg: "InvalidToken" });
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
const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });

    res.json({ msg: 'LoggedOut' });
}

const fetchusertype = (req,res) => {
    let sql = `select admin_check from userdetail where user_id=${req.user.user_id}`
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ msg: "nodata" })
        } else {
            res.json(data)
        }
    })
}
module.exports = {
    fetchusercredentials,
    verifytoken,
    logout,
    fetchusertype
}