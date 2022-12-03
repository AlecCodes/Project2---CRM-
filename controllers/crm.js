const express = require('express')
const Customer = require('../models/customer')

//////////////////
//Create router
//////////////////
const router = express.Router()

//////////////////////////
//ROUTER MIDDLEWARE This is where we check if user is logged into active session
//////////////////////////
// router.use((req,res,next)=>{
//     if(req.session.loggedIn){
//         next();
//     } else {
//         res.redirect("/user/login")
//     }
// })

/////////////////////////////
//ROUTES
/////////////////////////////
router.get("/seed",(req,res)=>{
    const startCustomers = [
        {name: "Alec", DOB:"05/07/1995"},
        {name: "Mr. Bean", DOB:"08/13/2017"}
    ]
    Customer.deleteMany({}, (err,data) => {
        Customer.create(startCustomers,(err,createdCusties) =>{
            res.json(createdCusties)
        })
    })
})

//SHOW route
router.get("/",(req,res)=>{
    Customer.find({})
    .then((customers)=>{
        res.json(customers)
    })
})

////////////////////////////
//EXPORT
////////////////////////////
module.exports = router