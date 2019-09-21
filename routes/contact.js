const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//  @route  GET api/contacts
//  @desc   Get all users contacts
//  @access Private

router.get('/', auth, async (request, response) => {
    try {
        let contactList = await Contact.find({ user: request.user.id }).sort({ date: -1 });
        response.json(contactList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal server error.' });
    }
});

//  @route  POST api/contacts
//  @desc   Add new contacts
//  @access Private

router.post('/',
    [
        auth,
        [
            check('name', 'Contact name is required.').not().isEmpty(),
            check('email', 'Email is required.').not().isEmpty(),
            check('email', 'Invalid email').isEmail()
        ]
    ]
    , async (request, response) => {
        let errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ message: 'Please check input data.' });
        }

        let user = request.user.id;
        const { name, email, phone, type } = request.body;
        try {
            let contact = await Contact.findOne({ email: email });
            if (contact) {
                return response.status(422).json({ message: 'This record is already exists.' });
            }

            contact = new Contact({
                user, name, email, phone, type
            });

            const contactResult = await contact.save();
            response.json(contactResult);
        } catch (error) {
            response.status(500).json({ message: error })
        }
    });

//  @route  PUT api/contacts/:id
//  @desc   Update contact.
//  @access Private

router.put('/:id', [auth, [
    check('name', 'Contact name is required.').not().isEmpty(),
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Invalid email').isEmail()]],
    async (request, response) => {
        let paramId = request.params.id;
        let errors = validationResult(request);
        let payload = request.body;
        if (!errors.isEmpty()) {
            return response.status(400).json({ message: 'Please check the input data.' });
        } else if (!payload.id) {
            return response.status(400).json({ message: 'Contact unique id is required.' });
        }
        try {
            let contact = await Contact.findById(paramId);
            if (contact) {
                let existsObjectResult = await Contact.findOne({ email: payload.email });
                if (existsObjectResult) {
                    if (contact.id === existsObjectResult.id) {
                        await contact.updateOne(payload, (error, updatedRow) => {
                            if (error) response.status(400).json({ message: 'Updation failed' });
                            return response.status(200).json(updatedRow);
                        });
                    } else {
                        return response.status(422).json({ message: 'This given email is matched with another exists record.' });
                    }
                } else {
                    await contact.updateOne(payload, (error, updatedRow) => {
                        if (error) response.status(400).json({ message: 'Updation failed' });
                        return response.status(200).json(updatedRow);
                    });
                }
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Internal server error' + error });
        }
    });

//  @route  DELETE api/contacts/:id
//  @desc   Delete contact.
//  @access Private

router.delete('/:id', auth, async (request, response) => {
    try {
        let id = request.params.id;
        let contact = await Contact.findById(id);
        if (contact) {
            await contact.remove((error, removedItem) => {
                if (error) response.json(error);
                response.status(200).json({ message: `${id} item deleted.` });
            });
        }
        else {
            response.status(306).json({ message: `Contact not found for given id : ${id}` });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;