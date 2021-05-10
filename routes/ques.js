const {Ques , validate} = require('../models/ques.js');

const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/:id' ,async (req,res) => {
    const ques = await Ques.findById(req.params.id);
    if(!ques) return res.status(404).send("Given question was not found");
    res.send( _.pick(ques , ['question']));
});

router.post('/' , async (req , res) => {
    const { error } = validate(req.body) ;
    if(error) return res.status(400).send(error.details[0].message) ;

    let ques = new Ques({
        question: req.body.question ,
        options: {
            A: req.body.option1,
            B: req.body.option2,
            C: req.body.option3,
            D: req.body.option4
        },
        answer: req.body.answer 
    });
    await ques.save(); 
    res.send({message: "question added" , link:"/adminshow"});
});

router.put('/:id',async (req,res)=>{
    let ques = await Ques.findByIdAndUpdate(req.params.id, req.body, {new: true});
    await ques.save();
    res.send({message: "Your ques updated" , link:"/adminshow"});
});

router.post('/delete/:id', async (req,res)=>{
    console.log('In route');
    const remove = await Ques.deleteOne({ _id: req.params.id});
    
    if(!remove)
        return res.status(404).send("Given ID was not found");
    
    res.redirect('/adminshow');
});

module.exports = router;
