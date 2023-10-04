const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();
const  cors = require('cors')
const connectDB = require('./db')

const Data = require('./models/data')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

connectDB();
const port = process.env.PORT || 5000;


app.get('/', async function(req, res){
    const data = await Data.find({}).limit(30);
    res.send(data)
})

app.use('/filter', require('./routes/filters'))
app.use('/charts', require('./routes/chartData'))


app.listen(port, function(){
    console.log("Listing on "+port)
})