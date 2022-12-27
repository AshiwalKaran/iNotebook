const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//JWT secret
const JWT_SECRET = 'Karanisagoodboy';

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        //If there are errors ,return Bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // console.log(req.body);

            //checking if the user with this email already exists or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" });
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
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    });

module.exports = router;