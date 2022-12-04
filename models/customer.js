const mongoose = require('./connection')

////////////////////////////
//Customer Model
////////////////////////////
const {Schema, model} = mongoose

const customerSchema = new Schema({
    name: String,
    DOB: String,
    creator: String,
    correspondence: [{date: String, body: String}],
})

const Customer = model("customer", customerSchema)


module.exports = Customer