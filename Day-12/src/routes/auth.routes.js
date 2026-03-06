const express = require("express")
const userModel =  require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router() 

    

authRouter.post("/register",async(req,res)=>{
    const {email,name,password} = req.body

    const isUserAlreadyExits = await userModel.findOne({email})

    if(isUserAlreadyExits){
        return res.status(400).json({
            message:"user already exit with this email"
        })
    }

    const user = await userModel.create({
        email , password  ,name
    })

    const token = jwt.sign(
        {
            id : user.id,
            email : user.email
        },
        process.env.JWT_SECRET

    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})

module.exports = authRouter

