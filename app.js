const express = require("express");
const app = express();

const loginRouter = require('./routers/login.js')

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome my page");
})

app.listen(8080, () => {
    console.log("서버 접속")
})