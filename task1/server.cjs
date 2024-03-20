const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./user.cjs")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/UserData")

app.post("/login", (req, res) => {
    const {rollno, email, password } = req.body
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Login Successful")
                }
                else (
                    res.json("Password is incorrect")

                )
            }
            else (
                res.json("No records found")
            )
        })
})

app.post("/register", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(error => res.json(error))
})

app.listen(3001, () => {
    console.log("Port server working");
})