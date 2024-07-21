const express = require('express');
const mongoose = require('mongoose');
const app = express();

// ROUTES

// GETS
app.get('/', (req, res)=> {
    res.send("Hello node API");
})

app.get('/blog', (req, res)=> {
    res.send("Hello blog");
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