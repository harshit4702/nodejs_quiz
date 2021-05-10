const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const questions = require('./routes/ques');
const { Ques } = require('./models/ques');
const { User , validateUser } = require('./models/user');
var shuffle = require('shuffle-array');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');

mongoose.connect(config.get('db') , { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${config.get('db')}`))
    .catch(err =>  console.error('Could not connect to mongodb'));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/admin' , questions);

app.get('/' , (req,res)=> {
    res.render('index');
});

app.get('/me',async(req,res)=> {
    res.render('meadmin');  
});

app.post('/queslist' ,async(req,res) => {
    const questions = await Ques.find();
    shuffle(questions);
    res.render('queslist' , {ques: questions});
});

app.get('/adminshow',auth,async(req,res)=> {
    const questions = await Ques.find();
    res.render('adminshow' , {ques: questions});
});

app.get('/logout', (req,res) => {
    res.cookie('secure', '', {expires: new Date(1), path: '/' });
    res.clearCookie('secure', { path: '/' });
    res.redirect('/me');
});

app.get('/admincreate',auth, (req,res)=> {
    res.render('adminform' , {question: "" ,options:{} ,answer:"",link: '/admin' , type: "post" , script:"/quiz.js" });
});

app.post('/submit' , async(req,res)=> {
    const { error } = validateUser(req.body) ;
    if(error) return res.status(400).send(error.details[0].message) ;
    
    console.log("Hello") ;
    let user = new User({
        name: req.body.name ,
        marks: req.body.marks 
    });
    await user.save(); 
    res.send({message: "Your response submitted" , link:"/"});
});

app.post('/verify' , async(req,res)=> {
    if(req.body.pass == '1234')
    {
        const token = jwt.sign({admin: 'True'} , config.get('jwtPrivateKey')) ;
        console.log('This is token');
        console.log(token);
        res.cookie('secure', token , {expires: new Date(Number(new Date()) + 2000000), httpOnly: true })
        res.send({ message: 'Verified' , link:"/adminshow"});
    }
    else 
    {
        res.send({message: "Incorrect Password" , link:"/me"});
    }
});

app.get('/adminedit/:id' , auth , async(req,res)=> {
    const { question , options , answer} = await Ques.findById(req.params.id);
    res.render('adminform' , {question,options,answer,link: `/admin/${req.params.id}`, type: "put" , script: "../quiz.js"});
});

const port=process.env.PORT || 8000 ;
console.log(port);
const server = app.listen(port, ()=> console.log(`Listening on port ${port}...`));

var env = process.env.NODE_ENV || 'development';
console.log(env);
