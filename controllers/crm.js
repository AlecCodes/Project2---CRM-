const express = require('express')
const Customer = require('../models/customer')

//////////////////
//Create router
//////////////////
const router = express.Router()

//////////////////////////
//ROUTER MIDDLEWARE This is where we check if user is logged into active session
//////////////////////////
router.use((req,res,next)=>{
    if(req.session.loggedIn){
        next();
    } else {
        res.redirect("/user/login")
    }
})

/////////////////////////////
//ROUTES
/////////////////////////////
router.get("/seed",(req,res)=>{
    const startCustomers = [
        {name: "Alec", DOB:"05/07/1995", phone:'555-555-5555', email: 'Alec@gmail.com', creator: "GOD", org: "General Assembly", correspondence: [{date:'12/4/2021', body:"Said what up to alec"}], lastContact: '12/4/2021'},
        {name: "Mr. Bean", DOB:"08/13/2017", phone:'555-322-1224', email:'mrbean@gmail.com', creator:"DOG GOD", org : "FBI", correspondence: [{date:'12/4/2022', body:"Said what up to bean"}, {date: '08/13/2017', body:'Bean born'},{date: '12/9/2022', body: "made bean dinner"}], lastContact:'12/9/2022'},
        {name: "Dexter", DOB:"03/01/2010", phone:'555-555-5555', email: 'Dexter@dgmail.com', creator:"DOG GOD", org: 'NBA', correspondence: [], lastContact: null}
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
        //Upon hitting index route (which should be the first step of a session) we sort the correspondence and then save to update the db with the sorted calls
        for(let customer of customers){
            customer.sorter()
            customer.updateLastContact()
            customer.save()               
        }     
        res.render('customers/home.ejs',{customers})
        }
    )
})

router.get('/creatorFilter', (req,res)=>{
    let filterParams = {}
    for (let i of Object.keys(req.query)){
        //ignore the empty query params/search filters
        if(req.query[i]){
            filterParams[i] = req.query[i]
        }
    }
    Customer.find(filterParams)
    .then((customers) =>{
        res.render('customers/home.ejs', {customers})
    })
})

//NEW route
router.get("/new", (req,res)=>{
    res.render("customers/new.ejs")
})


//DESTROY route
router.post("/:id",(req,res)=>{
    Customer.findByIdAndDelete(req.params.id, (err,deletedCust) =>{
        console.log(err,deletedCust)
        res.redirect('/customers')
    })
})

//UPDATE route
router.put("/:id",(req,res)=>{
    Customer.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedCust) =>{
        res.redirect("/customers")
    } )
})

//CREATE route
router.post("/", (req,res)=>{
    req.body.creator = req.session.username
    console.log("Created by user: "+req.body.creator)
    Customer.create(req.body, (err, createdCust) =>{
        res.redirect("/customers")
    })
})



router.get("/:id/newCorrespondence", (req,res)=>{
    
    Customer.findById(req.params.id)
    .then((customer)=>{
        res.render("customers/newCorrespondence.ejs",{customer})
        console.log(customer.correspondence)
    })
})

router.post("/:id/newCorrespondence",(req,res)=>{
    Customer.findById(req.params.id)
    .then((customer)=>{
        customer.correspondence.push(req.body)
        // customer.lastContact = customer.correspondence[customer.correspondence.length-1].date
        // console.log('MOST RECENT>>',customer.lastContact)
        customer.save()
        res.redirect('/customers')
    })
})

//EDIT route
router.get("/:id/edit", (req,res)=>{
    Customer.findById(req.params.id)
    .then((customer) =>
    {res.render("customers/edit.ejs",{customer})}
    )
})


//SHOW Route
router.get("/:id",(req, res)=>{
    Customer.findById(req.params.id)
    .then((customer) => {
        res.render("customers/show.ejs",{customer})
    })
})

//Show for individual call records. Could we use includes(_id) to find the specific record?
router.get("/:id/:recordid",(req,res)=>{
    Customer.findById(req.params.id)
    .then((customer)=>{
        for (const corr of customer.correspondence){
            if (corr._id.valueOf() === req.params.recordid){
                res.render("customers/showCorrespondence.ejs",{corr})
            }
        }
    })
})

////////////////////////////
//EXPORT
////////////////////////////
module.exports = router