const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//Registration of User...

router.post('/register', async (req, res) => {

    console.log("REQ BODY:", req.body);  // 🔍 debug line
    const {name, email, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({name, email, password: hashed});
    await user.save();
    res.json({message: "User Registered"});
});

router.post('/login', async (req, res)=>{
    const user = await User.findOne({ email: req.body.email});
    if(!user || !(await bcrypt.compare(req.body.password, user.password))){
        return res.status(401).json({error: 'Invalid Credentials'});
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res.json({ token, name: user.name, email: user.email });

});

module.exports = router;