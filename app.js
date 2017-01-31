const express = require('express');
const bodyParser = require('body-parser');
const db = require('monk')('localhost/mymongodb')
const dogs = db.get('dogs')

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(3000, function(){
  console.log('listening');
});

app.get('/',function(req,res,next){
  dogs.find({}).then(function (dogs) {
    res.json(dogs);
  });
});

app.post('/',function(req,res,next){
  dogs.insert({
    name: req.body.name,
    color:req.body.color,
    age:req.body.age
  }).then((dogs)=>{
    res.json(dogs);
  });
});

app.put('/:id',function(req,res,next){
  dogs.update(
    {_id:req.params.id},
    {
      name:req.body.name,
      age:req.body.age,
      color:req.body.color
    }
  ).then((dog)=>{
    res.json(dog);
  }).catch((err)=>{
    res.json(err);
  });
});

app.delete('/:id',function(req,res,next){
  dogs.remove({
    _id:req.params.id
  }).then((dog)=>{
    res.json(dog);
  });
});
