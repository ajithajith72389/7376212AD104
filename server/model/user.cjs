const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    companyname: String,
    ownerName: String,
    rollNo: String,
    ownerEmail: String,
    accessCode: String
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel