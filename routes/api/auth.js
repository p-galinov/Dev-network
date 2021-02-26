const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
    console.error(err.message);
    res.send('server error');
    }
});

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public

router.post('/', [
    check('email', 'Please insert a valid email').isEmail(),
    check('password', 'Password is requrieds').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        //Finding the user by email
        let user = await User.findOne({ email });

        if(!user){
          return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
          return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })  
        }

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtsecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );

    } catch(err){
      console.log(err.message);
      res.status(500).send('server error');
    }
    //Get users gravatar

    //Encrypt password

    //Return jsonwebtoken

});

module.exports = router;