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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());
app.use('/', router);

app.listen(httpsPort, () => {
    console.log("Your server started at port ", httpsPort);
});