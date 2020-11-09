// api/auth/
const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const router = express.Router();


// @desc Registration
// @route /api/auth
router.post('/register', 
    [
        check('email', "Invalid email").isEmail(),
        check('username', 'Invalid username')
        .isLength({min: 3, max: 15}),
        check('password', 'A password must be 6-20 characters long')
        .isLength({min: 6, max: 20})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid registration details'
                })
            }

            const {username, email, password, confPassword} = req.body;
            const possibleUser = await User.findOne({email});

            if (possibleUser) {
                return res.status(400).json({message: "User with such email account already exits"});
            } else if (password !== confPassword) {
                return res.status(400).json({message: "Passwords do not match, try again."})
            } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({username, email, password: hashedPassword});

            await user.save();

            res.status(201).json({message: 'You have been registered, and you can login by going to login page.'});
            }

        } catch (err) {
            res.status(500).json({message: 'Something went wrong, try again'});
        }
})


// @desc login to app
// @route /api/auth
router.post('/login', 
    [
        check('email', "Invalid email").isEmail(),
        check('password', 'A password must be 6-20 characters long')
        .isLength({min: 6, max: 20})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login details'
                })
            }
            
            const {email, password} = req.body;
            const user = await User.findOne({email});

            if(!user) {
                return res.status(400).json({message: "Invalid login details, try again."});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            
            if(!isMatch) {
                return res.status(400).json({message: "Invalid login details, try again."});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret')
            )

            res.json({token, userId: user.id, username: user.username});

        } catch (err) {
            res.status(500).json({message: 'Something went wrong, try again'});
        }
})

module.exports = router;