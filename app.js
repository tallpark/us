const express = require("express");
const app = express();

<<<<<<< Updated upstream
=======
const loginRouter = require('./routers/login.js')
const registerRouter = require("./routers/register")

>>>>>>> Stashed changes
app.use(express.json());

app.use("/register", registerRouter);

app.get("/", (req, res) => {
    res.send("Welcome to my page");
})

app.listen(8080, () => {
    console.log("서버 접속")
})