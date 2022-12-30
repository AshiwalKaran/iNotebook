const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser =require('../middleware/fetchuser');

//JWT secret
const JWT_SECRET = 'Karanisagoodb$oy';

//Route 1--> New user creation
//POST using "/api/auth/createUser"
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        //If there are errors ,return Bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        let success=false;
        try {
            // console.log(req.body);

            //checking if the user with this email already exists or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success,error: "Sorry a user with this email already exists" });
            }

            //Hashing and using salt

            const salt = await bcrypt.genSalt(10);
            const secretPassword = await bcrypt.hash(req.body.password, salt);

            //New way to create a user instead of user.save() function.
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secretPassword
            });

            //Authorizarion token
            //console.log(user.id)==63aab4910cf1954e3139b7dc
            // console.log(user._id)==new ObjectId("63aab545de8fb05fac0b5602")
            const data = {
                user: {
                    id: user.id
                }
            }
            success=true;
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({success, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Interval server error');
        }
    });

    //Route 2--> Authenticate a User using POST "/api/auth/login"

    router.post('/login',[
        body('email','Enter a valid email').isEmail(),
        body('password','Password cannot be blank').exists()
    ],
    async (req,res)=>{
        //If there are errors ,return Bad request and the errors
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        let success=false;
        //Destructuring 
        const {email,password}=req.body;
        try {
            let user=await User.findOne({email});
            if(!user){
                return res.status(400).json({error:'Please try to login with correct credentials'});
            }
            let passwordCompare=await bcrypt.compare(password,user.password);

            if(!passwordCompare){
                return res.status(400).json({success,error:'Please try to login with correct credentials'});
            }
            const data={
                user:{
                    id:user.id
                }
            }
            success=true;
            const authtoken=jwt.sign(data,JWT_SECRET);
            res.json({success,authtoken});
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Interval server error');
        }
    });

    //Route 3--> Get loggedin User details using POST "/api/auth/getUser"

    router.post('/getUser',fetchuser,async(req,res)=>{
        try {
            const userId=req.user.id;
            const user=await User.findById(userId).select('-password');
            res.send(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Interval server error');
        }
    })
    
module.exports = router;