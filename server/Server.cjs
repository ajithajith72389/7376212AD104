const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ProductModel = require('./model/product.cjs')
const  UserModel  = require('./model/user.cjs')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Top_N_Product');

app.get('/', (req, res) => {
    ProductModel.find()
        .then(prodcuts => res.json(prodcuts))
        .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    ProductModel.create(req.body)
        .then(prodcuts => res.json(prodcuts))
        .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndUpdate({ _id: id }, {
        productName: req.body.productName,
        price: req.body.price,
        rating: req.body.rating,
        discount: req.body.discount,
        availability: req.body.availability
    }).then(user => res.json(user))
        .catch(err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})


app.post('/products/auth', (req, res) => {
    const { companyname, ownerName, rollNo, ownerEmail, accessCode } = req.body;
    bcrypt.hash(accessCode, 6)
        .then(hash => {
            UserModel.create({ companyname, ownerName, rollNo, ownerEmail, accessCode: hash })
                .then(user => res.json("Success"))
                .catch(err => res.json(err))
        }).catch(err => res.json(err))
})

app.post('/products/login', (req, res) => {
    const { companyname, ownerName, ownerEmail, accessCode, rollNo } = req.body;
    UserModel.findOne({ ownerEmail: ownerEmail })
        .then(user => {
            if (user) {
                bcrypt.compare(accessCode, user.accessCode, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ ownerEmail: user.ownerEmail, role: user.role },
                            "jwt-secret-key", { expiresIn: '1d' })
                        res.cookie('token', token)
                        return res.json({ Status: "Success", role: user.role })
                    } else {
                        return res.json("The accesscode is incorrect")
                    }
                })
            } else {
                return res.json("No record existed")
            }
        })
})

app.listen(3001, () => {
    console.log("Server is Running");
})