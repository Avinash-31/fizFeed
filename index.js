const express = require('express');
const app = express();
const port = 8000;

app.listen(port,function(err){
    if(err){
        // console.log(err);
        // inerpolation
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Express Server is running on Port ${port}`);
});