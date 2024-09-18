const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.length < 6) {
                throw new Error('Password length must be more than 6 letters')
            }
        }
    },

    tokens: [{
        token: {
            type:String
        }
    }],

    options: {
        type: String,
    },

    mcqDone:{
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'NekoGift');
    user.tokens = user.tokens.concat({token});
    return token;
}

userSchema.methods.saveOptions = async function (option){
    const user = this;
    console.log(user, option);
    user.options = option;
    user.mcqDone = 1;
    return 1;
}

userSchema.statics.findByCredentials = async function (password){
    console.log(password);
    const user = await User.findOne({password: password});
    console.log(user);
    if(!user){console.log('ne'); throw new Error('No user found');}
    return user;
}

const User = mongoose.model('user', userSchema);

module.exports = User;