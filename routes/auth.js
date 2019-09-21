const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

//  @route   Get api/auth
//  @desc    Get logged in user
//  @access  private

router.get('/', auth, async (request, response) => {
    try {
        const user =await User.findById(request.user.id).select('-password');
        response.json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).json('Internal server error');
    }
});

//  @route   POST api/auth
//  @desc    Auth user and get token
//  @access  public

router.post('/', [
    check('email', 'Email is required.').not().isEmpty(),
    check('password', 'Password is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please enter a password with 6 or more charactors.').isLength({ min: 6 })
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return response.status(401).json({ message: 'Invalid email, please try again.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: 'Invalid password, please try again.' });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (error, token) => {
            if (error) {
                return response.status(403).json({ message: 'Failed to get token.' });
            }
            response.json({ token });
        });
    } catch (error) {

    }
});

module.exports = router;