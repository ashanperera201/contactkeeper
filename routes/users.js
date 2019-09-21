const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//  @route POST api/users
//  @desc register user
//  @access Public
router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please enter a password with 6 or more charactors.').isLength({ min: 6 })
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = request.body;

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return response.status(400).json({ msg: 'User already exists.' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            response.json({ token });
        })

    } catch (err) {
        console.log(err.message);
        response.status(500).send('Internal server error');
    }
});

module.exports = router;    