const express = require('express');
const router = express.Router();

//  @route   Get api/auth
//  @desc    Get logged in user
//  @access  private

router.get('/', (request, response) => {
    response.send('get logged in user.');
});

//  @route   GEt api/auth
//  @desc    Auth user and get token
//  @access  public

router.get('/', (request, response) => {
    response.send('Log in user.');
});

module.exports = router;