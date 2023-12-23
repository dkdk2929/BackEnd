const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require('body-parser')
dotenv.config()

const app = express()
const port = process.env.PORT || 4000


app.get('/',(req,res) => {
    res.send('Hello World')

})
app.use(bodyParser.json())

routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)
.then(() =>{
    console.log('Connect to DB successfully ')
})
.catch((err) => {
    console.log(err)
})



app.listen(port,() => { 
    console.log('Server is running in port ',+ port)
})
