//This page creates validators user inputs and then creates a user using .create mehtod
//here we are only hashing the password uising bcrypt no jwt
const bcrypt = require('bcrypt') // to hash our password using bcrypt library
const {isEmail} = require('validator')
const User = require('../models/User')

const saltRounds = 10

const validateSignUpData = async (req,res) => {
    const {name,email,password} = req.body    //extracting name email and password from body

    // trailing spaces will be deleted
    if(name.trim().length === 0){
        res.status(400).json({message: 'Please Enter a Name'})
        return false
    } 
    // Checking valid email
    if(!isEmail(email)){
        res.status(400).json({message: 'Please Enter a Valid Email'})
        return false
    } 
    //Checking valid password
    if(password.trim().length === 0){
        res.status(400).json({message: 'Please Enter a Password'})
        return false
    } 
    else if(password.trim().length <= 5){
        res.status(400).json({message: 'Minimum length of the password should be 6'})
        return false
    }

    // Checking if user already exists (Validation function)
    const exsitingUser = await User.findOne({email}).exec()

    if(exsitingUser){
        res.status(400).json({message: 'Email Already Registered'})
        return false
    }
    return true;
};


module.exports = async(req, res) => {
    const {name,email,password} = req.body    //extracting name email and password from body
    const isValid = await validateSignUpData(req, res)
    // if (isValid) then create a account and hash his password
    if(isValid){
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const user = await User.create({name,email,password : hashedPassword});
res.json({
    message: 'Account Created Succesfully',
    user: {_id: user.id, name:user.name, email: user.email}
})
        } catch (error) {
            console.log(error);
            res.status(400).json({message: error});
        }
    }
};