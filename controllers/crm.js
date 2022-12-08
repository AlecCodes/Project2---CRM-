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
        {name: "Alec", DOB:"05/07/1995", creator: "GOD", correspondence: [{date:'12/4/2022', body:"Said what up to alec"}]},
        {name: "Mr. Bean", DOB:"08/13/2017", creator:"DOG GOD", correspondence: [{date:'12/4/2022', body:"Said what up to bean"}, {date: '08/13/2017', body:'Bean born'}]},
        {name: "Dexter", DOB:"03/01/2010", creator:"DOG GOD", correspondence: []}
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
        res.render('customers/home.ejs',{customers})
        }
    )
})

router.get('/creatorFilter', (req,res)=>{
    let filterParams = {}
    for (let i of Object.keys(req.query)){
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
    .then((foundCustomer)=>{
        //console.log("Before push: "+foundCustomer)
        foundCustomer.correspondence.push(req.body)
        foundCustomer.save()
        //console.log("After push: "+foundCustomer)
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
        customer.correspondence.sort((a,b)=>{
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