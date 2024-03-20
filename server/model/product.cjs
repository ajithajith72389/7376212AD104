const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    productName: String,
    price: String,
    rating: String,
    discount : String,
    availability: String
})

const ProductModel = mongoose.model("product", UserSchema)

module.exports = ProductModel;