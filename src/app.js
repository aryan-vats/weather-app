const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")


const app = express()
const port = process.env.PORT || 3000

//Define paths
const publicDirectoryPath=path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//Setup handlebar engine and views location
app.set('view engine','hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get("",(req,res)=>{
    res.render("index",{
        name: "Aryan",
        title: "Weather"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        text: "This is some helpful text"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Enter the address"
        })
    }

    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})
app.get("/help/*",(req,res)=>{
    res.render("error",{
        title: "Error 404",
        msg: "Help article not found"
    })

})
app.get("*",(req,res)=>{
    res.render("error",{
        title: "Error 404",
        msg: "Page not found"
    })
})
app.listen(port,()=>{
    console.log("Server is up at port "+port)
})