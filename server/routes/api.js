const express = require('express')
const router = express.Router()

const User=require('../models/user')

const mongoose=require('mongoose')

const db="mongodb+srv://shraddhansu:shraddhansu@cluster0-zzxti.mongodb.net/Eventdb?retryWrites=true&w=majority"

mongoose.connect(db,err=>{
    if (err){
        console.error(err)
    } else{
        console.log('connected mongodb')
    }
    
})
router.get('/',function(req,res){
    res.send('hello from api')
})
router.post('/register',(req,res)=>{
    let userData=req.body
    let user=new User(userData)
    user.save((error,registeredUser)=>{
        if (error){
            console.log(error)
        }
        else {
            res.status(200).send(registeredUser)
        }
    })
})
        
module.exports=router