
const config =require('config');
const debug =require('debug')('app:startup');
const helmet =require('helmet');
const morgan =require('morgan');

const Joi =require('joi');
const logger =require('./logger');
const express = require('express');
const { urlencoded } = require('express');
const { mapLimit } = require('async');
const app= express();

app.use(express.json());
app.use(urlencoded());
app.use(express.static('public'));
app.use(helmet());

//set NODE_ENV=development / production

console.log('Application name: '+ config.get('name'));
console.log('Mail server: '+ config.get('mail.host'));

console.log('Mail password: '+ config.get('mail.password'));

if(app.get('env')=== 'development'){ //Enviroment
    app.use(morgan('tiny')); 
    debug("Morgan Enabled...");
}

app.use(logger);
app.use(function(req,res,next){
    console.log('Authentication...');
    next();
});
var courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
];

function maxx(courses){
    var cc=0;

    const ids = courses.map(object => {
        return object.id;
      });
      cc = Math.max(...ids);
    return cc+1;
}

app.get('/', (req, res) => {
    res.send('Hiiii');
});

app.get('/api/posts/:id', (req, res) => {
    const course=courses.find(c =>c.id == (req.params.id));
    if(!course) res.status(404).send("Not Found");
    res.send(course);
});

app.post('/api/posts', (req,res)=>{
    if(!req.body.id || req.body.id<maxx(courses)){
        courses.push({id:maxx(courses),name:req.body.name})
        res.send(courses);
    }
    else
//    const course= courses.find(c =>c.id == (req.body.id));
    res.send(courses);
});
app.post('/api/postss', (req,res)=>{ 
    console.log(maxx(courses));

  courses.push({id:maxx(courses),name:req.body.name})
    res.send(courses);
});


app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));