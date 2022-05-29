const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi'); //Optional(), required(), min(), max()
const res = require('express/lib/response');
const app= express();
app.use(express.json());
mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    .find({ isPublished: true })
    .sort('-price')
    .select('name author price');
}
async function run(res) {
    const courses = await getCourses();
    console.log(courses);
    res.send(courses);
}

async function addCourse(req,res) {
  // const course =new Course({
    const course = await Course.create({
      //  id: courses.length + 1,
      name: req.body.name,
      author:req.body.author,
      isPublished: req.body.isPublished,
      tags: req.body.tags,
      date: Date.now(), 
      price: req.body.price
    })
    const courses = await getCourses();
  //courses.push(course);
  res.send(courses);
}


async function updateCourses(req,res) {
  const course = await Course.findById(req.body._id);
  if(!course) return;
  course.isPublished=true;
  course.author='Another author name';
  const result=await course.save();
  res.send(result);
}

async function deleteCourse(req,res) {
  const result =await Course.deleteOne({_id:req.body._id});
  res.send(result);
}



app.get('/courses', (req,res)=>{    //Showing Courses
  run(res);
});

app.post('/courses', (req, res) => { //Adding new Course
    addCourse(req,res);
});

app.put('/courses', (req, res) => { //Updateing courses
    updateCourses(req,res);
});

app.delete('/courses', (req, res) => { //Deleting course
  deleteCourse(req,res);
});



//run();
// function maxx(courses){
//   var cc=0;

//   const ids = courses.map(object => {
//       return object.id;
//     });
//     cc = Math.max(...ids);
//   return cc+1;
// }

app.get('/', (req, res) => {
  res.send('Home');
});


app.post('/courses', (req, res) => {

  const course=courses.find(c =>c.id == (req.params.id));

  const courses = getCourses();
  if(!courses)
    res.status(404).send("Not Found");
  
  res.send(courses);

});
/*


app.post('/courses', (req,res)=>{
  if(!req.body.id || req.body.id<maxx(courses)){
      courses.push({id:maxx(courses),name:req.body.name})
      res.send(courses);
  }
  else
//    const course= courses.find(c =>c.id == (req.body.id));
  res.send(courses);
});


app.delete('/courses/:year/:month', (req, res) => {
  res.send(req.params);
});

*/

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));