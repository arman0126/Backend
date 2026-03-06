const mongoose = require("mongoose")

function connecToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("connected to DB")
    })
}

module.exports = connecToDB