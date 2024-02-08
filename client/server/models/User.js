const mongoose = require('mongoose');
const {isEmail} = require('validator')  // using validator library

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter a Name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email Id'],
        unique: true, // one email id can only create one account, if already exsiting user makes another account with same email, then error
        validate: [isEmail, 'Please Enter Valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minLength: [6, 'Minimum password length is 6'] //Conditonal statement , if 6 or more then accepts password else says 'Minimum password length is 6'

    }
})

const User = mongoose.model('user', userSchema)

module.exports = User;