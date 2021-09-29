
const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/Auth')
const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client("878786950565-kmum1ne551io15kq1ibvlae1to9bj11a.apps.googleusercontent.com")

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


router.post('/googlelogin', (req, res) => {
    const {tokenId} = req.body

    client.verifyIdToken({idToken:tokenId, audience:"878786950565-kmum1ne551io15kq1ibvlae1to9bj11a.apps.googleusercontent.com"}).then((response) => {
        const {email_verified, name, email} = response.payload
   
         console.log(response.payload) 

         if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                    const { _id, email, name,  } = user;
                    return res.json({
                        token,
                        user: { _id, email, name,  }
                    });
                } else {
                    let password;
                    user = new User({ name, email, password });
                    user.save((err, data) => {
                        if (err) {
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                            return res.status(400).json({
                                error: 'User signup failed with google'
                            });
                        }
                        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                        const { _id, email, name,  } = data;
                        return res.json({
                            token,
                            user: { _id, email, name,  }
                        });
                    });
                }
            });
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again'
            });
        }

    })

})

module.exports = router;









