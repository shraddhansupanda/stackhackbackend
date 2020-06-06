const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const port = 3000

const api=require('./routes/api')

const app=express()

app.use(bodyparser.json())

app.use(cors())

app.use('/api',api)
app.get('/',function(req,res){
    res.send('helo from server')
})

app.listen(port,function(){
    console.log("server is runing on " + port)
}
)