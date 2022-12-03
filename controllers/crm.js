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


//INDEX route
router.get("/",(req,res)=>{
    Customer.find({})
    .then((customers)=>{
        res.render('home.ejs',{customers})
    })
})

//NEW route
router.get("/new", (req,res)=>{
    res.render("new.ejs")
})


//CREATE route
router.post("/", (req,res)=>{
    Customer.create(req.body, (err, createdCust) =>{
        res.redirect("/customers")
    })
})

//SHOW Route
router.get("/:id",(req, res)=>{
    Customer.findById(req.body.id)
    .then((customer)=>{
        res.render("show.ejs",{customer})
    })
})

////////////////////////////
//EXPORT
////////////////////////////
module.exports = router