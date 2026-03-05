// server ko start karna
// database say connect krna


const app = require('./src/app')
const mongooes = require("mongoose")


function connectToDb(){
    mongooes.connect("mongodb+srv://armanansariin2027_db_user:cp5Fh2l8qF1Ke1Rz@cluster0.qqqsdrq.mongodb.net/day-5")
    .then(()=>{
        console.log("connected to database")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("server is running at 3000")
})