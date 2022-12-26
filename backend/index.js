const express=require('express');
const connectToMongo=require('./db');

connectToMongo();

const app=express();
const port=5000;

//Available routes

app.get('/',(req,res)=>{
    res.send('Hello World!!!!!');
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})