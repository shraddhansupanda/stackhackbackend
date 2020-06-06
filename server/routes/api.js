const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

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

router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })
  
  router.get('/special', (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })



router.post('/register',(req,res)=>{
    let userData=req.body
    let user=new User(userData)
    user.save((error,registeredUser)=>{
        if (error){
            console.log(error)
        }
        else {
            let payload = {subject:registeredUser._id}
            let token = jwt.sign(payload,'secretkey')
            res.status(200).send({token})
        }
    })
})
router.post('/login',(req,res)=>{
    let userData=req.body

    User.findOne({email:userData.email},(error,user)=>{
        if (error){
            console.log(error)
        }else{
            if(!user){
            res.status(401).send('Invalid email')
            }else{
                if (user.password != userData.password){
                    res.status(401).send('Ivalid password')
                }else{
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload,'secretKey')
                    res.status(200).send( {token} )
                }
            }
        }
    })

})       
module.exports=router