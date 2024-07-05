const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = 'itisaiNotebookApp'


// Route 1:
router.post('/createuser', [
    //authentication code express-validator
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a valid password").isLength({ min: 5 }),
], async (req, res) => {
    //if there are errors return bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //check whether user with same exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: "User with same email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        //using promins
        // .then(user => res.json(user))
        //     .catch(err => {
        //         console.error(err)
        //         res.json({ error: "Please enter a unique value for email" })
        //     });
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        res.json({ authToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route 2: authenticate user using "/api/auth/login" endpoint no login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Can not be blank").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Please try to login with correct cerdentials" });
        }
        const passCompare = await bcrypt.compare(password,user.password);
        if (!passCompare) {
            return res.status(400).json({ errors: "Please try to login with correct cerdentials" });
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

})

//  Route 3: Get loged in user details using: POST "/api/auth/getUser" login required
router.post('/getUser', fetchUser,async (req, res) => {
try {
    const userId=req.user.id;
    const user =await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
});


module.exports = router