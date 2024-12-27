const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const { router } = require('./router/routes');
dotenv.config();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());
app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log("Your server started at port ", process.env.PORT);
});