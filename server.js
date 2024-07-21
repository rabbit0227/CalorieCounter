const express = require('express');
const app = express();

// ROUTES

app.get('/', (req, res)=> {
    res.send("Hello node API");
})

app.listen(3000, ()=>{
    console.log('Node API app is running on port 3000')
})