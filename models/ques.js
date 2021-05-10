const Joi = require('joi');
const mongoose = require('mongoose');

const options_object = new mongoose.Schema({
    A:{
        type: String,
        required: true
    },
    B:{
        type: String,
        required: true
    },
    C:{
        type: String,
        required: true
    },
    D:{
        type: String,
        required: true
    }
});

const quesSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: options_object,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Ques = mongoose.model('Ques' , quesSchema) ;

function validate(input)
{
    const schema = Joi.object({
        question: Joi.string().required(),
        option1: Joi.string().required(),
        option2: Joi.string().required(),
        option3: Joi.string().required(),
        option4: Joi.string().required(),
        answer: Joi.string().required()
    });
    return result = schema.validate(input);
}

module.exports.Ques = Ques ;
module.exports.validate = validate ;