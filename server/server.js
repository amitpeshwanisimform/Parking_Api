const _ = require('lodash');
const hbs = require('hbs');
const reload=require('reload')

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.set('view engine', 'hbs');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var newTodo = new Todo({
    flag: req.body.flag,
    id:req.body.id
  });

  Todo.findOneAndUpdate({id:newTodo.id},{$set:{flag:newTodo.flag}}).then((todo)=>{
    if(!todo){
      console.log("No todo");
      newTodo.save().then((doc)=>{
        res.send(doc);
      })
    }else{
      res.send(todo)
    }

    
  })

  //    res.render('home.hbs', {
  //   flag_1: flag,
  //   welcomeMessage: 'Welcome to my website',
    
  // });

   

  // todo.save().then((doc) => {
  //   res.send(doc);
  // }, (e) => {
  //   res.status(400).send(e);
  // });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

var flagg=0;

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  
  
  Todo.find({id:id}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    
        flagg=todo[0].flag
console.log(todo);
console.log(flagg)
    res.send({todo});


  }).catch((e) => {
    res.status(400).send();
  });
  

   res.render('home.hbs', {
    flag_1: flagg,
    welcomeMessage: 'Welcome to my website',
    
  });



});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['flag', 'id']);

  

  
  Todo.findAndUpdate({id:id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

app.get('/home', (req, res) => {
  res.render('about.hbs', {
    flag: flagg,
    currentYear: new Date().getFullYear()
  });
});

reload(app);
module.exports = {app};
