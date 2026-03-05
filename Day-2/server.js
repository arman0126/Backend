const express = require("express")

const app = express() // server instance create krna

app.get('/',(req,res) =>{
    res.send("hellow world")
})

app.get("/about",(req,res) => {
    res.send("this is about page")
})

app.listen(3000) // sever start karna



// npm nodemon server.js