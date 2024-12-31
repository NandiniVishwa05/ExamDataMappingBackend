const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { router } = require('./router/routes');
const httpsPort = Number(process.env.PORT) || 3443;

dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://192.168.1.5:3000","http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());
app.use('/', router);

// app.listen(httpsPort, '0.0.0.0', () => {
//     console.log("Your server started at port ", httpsPort);
// });

module.exports = app;