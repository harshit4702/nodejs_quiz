const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    marks: {
        type: Number
    }
});

const User = mongoose.model('User' , userSchema) ;

function validateUser(input)
{
    const schema = Joi.object({
        name: Joi.string().required(),
        marks: Joi.number()
    });
    return result = schema.validate(input);
}

module.exports.User = User ;
module.exports.validateUser = validateUser ;