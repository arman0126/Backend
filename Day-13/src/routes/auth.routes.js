const exprees = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRoute = exprees.Router()
const crypto = require("crypto");

authRoute.post("/register", async(req,res)=>{
    console.log(req.body);
    const {email,name,password} = req.body
   
    const isUserAlreadyExist =await userModel.findOne({email})
    
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"user already exit with this email"6
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user =  await userModel.create({
        email , password: hash,name
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message : "user registered succesfullyh",
        user,
        token
    })

})


authRoute.post("/protected",(req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message:"This is protected route"
    })
})


authRoute.post("/login",async(req,res)=>{
    const {email , password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user does not exist with this email"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched){
        return res.status(401).json(
            {
                message:"Invalid password"
            }
        )
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"user logged in",
        user,
    })
})


module.exports = authRoute