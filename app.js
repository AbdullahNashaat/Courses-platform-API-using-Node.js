const Joi = require('joi');
const querystring = require('querystring');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const repo = require('./repo');
const { stringify } = require('qs');
const { string } = require('joi');

var name=" ";

app.use(express.json());

/*const courses=[
    { id:1, name: 'course1' },
    { id:2, name: 'course2' },
    { id:3, name: 'course3' },
];*/
//write on jason file
/*fs.writeFile ("input.json", JSON.stringify(courses), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);*/

//read on jason file
let rawdata = fs.readFileSync(path.resolve(__dirname, 'input.json'));
var courses = JSON.parse(rawdata);
//console.log(courses);

app.get('/',(req, res)=> {
    res.send('Hello world');
});

app.get('/api/courses',(req, res)=> {
    res.send(courses);
    //console.log('hi',courses);
});

app.get('/api/courses/id/:id',(req, res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('plah');
    res.send(course);
});

app.get('/api/courses/name/:name',(req, res)=> {
    
    const course = courses.find(c => c.name === req.params.name);
    if(!course) return res.status(404).send('plah');
    res.send(course);
});

app.get('/api/courses/datefrom/:date',(req, res)=> {
    
    const course = courses.filter(c => Date.parse(c.startDate) >= Date.parse(req.params.date));
    if(!course) return res.status(404).send('plah');
    res.send(course);
});


//"id=1&name=course1&description=start&startDat=2021-05-23"

app.get('/api/courses/search/:paramsString',(req, res)=> {
    let searchParams = new URLSearchParams(req.params.paramsString);
    const course = courses.filter(c => CheckParams(c,searchParams)); //need to pass searchParams to CheckParams too 
    if(!course) return res.status(404).send('plah');
    res.send(course);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

app.post('/api/courses',(req, res)=> {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1, //bug //uuid #4
        name: req.body.name,  // bug #5
        description:req.body.description,   //no validation
        startDate:req.body.startDate,       //no validation
        endDate:req.body.endDate            //no validation
    }
    courses.push(course);
    repo.writeonjason(courses);
    res.send(course);
});

app.put('/api/courses/:id',(req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('plah');
  
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    repo.writeonjason(courses);
    res.send(course);

});
function validateCourse(course) {
    const schema = Joi.object({

        name: Joi.string().min(3).required(),
        description: Joi.string(),
        startDate: Joi.string(),   
        endDate: Joi.string()

    });
    // return Joi.valid(course, schema);
    return schema.validate(course);
}
function CheckParams(course,searchParams)
{
    let f=true;
   
    if(searchParams.has('id'))
        if(parseInt(searchParams.get('id')) != course.id)
            f=false;
    if(searchParams.has('name'))
        if(searchParams.get('name') != course.name)
            f=false;
    if(searchParams.has('startdatefrom'))
        if( Date.parse(searchParams.get('startdatefrom')) > Date.parse(course.startDate))
            f=false;
    if(searchParams.has('enddateto'))
        if( Date.parse(searchParams.get('enddateto')) < Date.parse(course.endDate))
            f=false;
    //console.log(searchParams.get('name') +" "+ course.name);
    return f;
}
