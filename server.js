const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel')
const Foods = require('./models/foodsModel')
const Activities = require('./models/activitiesModel')


const app = express();



app.use(express.json());

// ROOT ROUTES

// GETS
app.get('/', (req, res)=> {
    res.send("Hello node API");
})

// USER ROUTES

// POSTS

app.post('/user', async(req, res) =>{
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.log(err.message);
        res.status(500).json({message: error.message});
    }
})



mongoose.set("strictQuery", false);
mongoose.
connect('mongodb+srv://admin:admin@csc-318-project.ywpdsjw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=CSC-318-Project')
.then(()=>{
    console.log("Connected to mongoDB");
    app.listen(3000, ()=>{
        console.log('Node API app is running on port 3000');
    })

}).catch((error)=> {
    console.log(error);
});