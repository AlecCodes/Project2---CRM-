const MongoStore = require('connect-mongo')
const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const session = require('express-session')
const methodOverride = require("method-override")
const PORT = process.env.PORT || 3300
const crmRouter = require('./controllers/crm')
const userRouter = require("./controllers/user")
const app = express();

////////////////////////////////
//MIDDLEWARE
////////////////////////////////
app.use("/static",express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(morgan("tiny"))
//app.use(methodOverride("_method"))
app.use("/static",express.static("public"))
app.use(session({
    secret: process.env.SECRET || 'Bruh',
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false
}))

app.use('/user', userRouter)
app.use('/customers', crmRouter)

//landing route
app.get('/',(req,res)=>{
    res.render('landingpage.ejs')
})

//listener
app.listen(PORT, ()=>console.log(`TURNING UP ON PORT NUMBER ${PORT}`))