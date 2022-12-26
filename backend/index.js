const express=require('express');
const connectToMongo=require('./db');

connectToMongo();

const app=express();
const port=5000;

//To access the body of request we need to add "app.use(express.json())" middleware
app.use(express.json());

//Available routes

app.use('/api/auth',require('./routes/auth'));
// app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})