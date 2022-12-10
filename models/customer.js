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
    lastContact: Date
})

customerSchema.methods.sorter = function(){
    this.correspondence.sort((a,b)=>{
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
            if (aDate > bDate){
                return 1
            }if (aDate < bDate){
                return - 1
            }else{
                return 0
            }
        })
}

customerSchema.methods.updateLastContact = function(){
    this.lastContact = '1/1/2000'
}

const Customer = model("customer", customerSchema)


module.exports = Customer