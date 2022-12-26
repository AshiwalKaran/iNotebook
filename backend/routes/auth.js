const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');

// router.get('/',(req,res)=>{
//     // console.log(req.body);
//     const user=User(req.body);
//     user.save();
//     res.send(req.body);
// });

router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5})
    ],
    async (req,res)=>{
        //If there are errors ,return Bad request and the errors.
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        // console.log(req.body);

        //checking if the user with this email already exists or not
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"});
        }

        // const user=User(req.body);
        // user.save();
        // res.send(req.body);

        //New way to create a user instead of user.save() function.
        user =await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:'Please enter a unique value for email',message:err.message})});
        res.json(user);
    });

module.exports=router;