const jwt = require('jsonwebtoken');

//JWT secret
const JWT_SECRET = 'Karanisagoodb$oy';

const fetchuser=(req,res,next)=>{
    //get the user from the JWT token and add id to request object

    const token=req.header('auth-token'); //Getting the token from header
    if(!token){
        //If for some reason we donot get the token
        res.status(401).send({error:'Please authenticate using a valid token'});
    }
    try {
        //now we are verigying the token using the JWT secret
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user; //In JWT token we put the Id of the user now in this step we are putting that ID in the request object and we are stored that ID as a object user:{id:{id:user.id}}
        next(); //If verified then execute the next function

    } catch (error) {
        res.status(401).send({error:'Please authenticate using a valid token'});
    }
}

module.exports=fetchuser;