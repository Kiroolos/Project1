const Joi =require('joi');
const logger =require('./logger');
const express = require('express');
const { urlencoded } = require('express');
const app= express();
.

app.use(express.json());
app.use(urlencoded());

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