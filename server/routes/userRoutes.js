
const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/Auth')

//register user
router.post('/register', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        let user  = await User.findOne({email})
        if(user){
            return res.status(400).json({error:"user already exists"})
        }
        //hashing password
        const passwordHash = await bcrypt.hash(password, 10)
        //...

        //saving user details into database
      user =  new User({
            name,
            email,
            password:passwordHash

        })
        await user.save()
      
        return res.status(201).json({message:"user created succesfully"})

    }
    catch(err){
        console.error(err);
        res.status(500).send()
    }
})

//login route
router.post('/login', async(req, res) => {
    try{
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user){
        res.status(400).json({error:"Invalid credentials"})
    }
    const Matched = await bcrypt.compare(password, user.password)
    if(!Matched){
       res.status(400).json({error:"Invalid credentials"})
    }
    //creating token to particular user
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"})
    return res.json({token})
    //.....

}
catch(err){
    console.error(err)
    res.status(500).send()
}
})

router.get('/', requireLogin, async (req, res) => {
    try { 
        const user =  await User.findById(req.user._id).select("-password")
        res.json(user)

    } catch (err) {
        console.log(err)
    }
})
//router.get("/", (req, res) => {
//    res.send("server is up and running")
//})

module.exports = router;









