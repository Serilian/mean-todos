var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://fhagno:manana11@ds111370.mlab.com:11370/meantodosapp', ['todos']);

//get all todos
router.get('/todos', function (req, res, next) {
  db.todos.find((err, todos) => {
    if (err) {
      res.send(err);
    } else {
      res.json(todos);
    }
  });
});


//get single todo
router.get('/todo/:id', (req, res, next) => {
  db.todos.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, (err, todo) => {
    if (err) {
      res.send(err);
    } else {
      res.json(todo);
    }
  });
});


//save todo
router.post('/todo', (req, res, next) => {
  var todo = req.body;
  if (!todo.text || !(todo.isCompleted + '')) {
    req.status(400);
    res.json({
      "error": "Invalid data"
    });
  } else {
    db.todos.save(todo, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

//Update todo
router.put('/todo/:id', (req, res, next) => {
  var todo = req.body;
  var updObj = {};

  if(todo.isCompleted) {
    updObj.isCompleted = todo.isCompleted;
  }

  if(todo.text) {
    updObj.text = todo.text;
  }

  if (!updObj) {
    req.status(400);
    res.json({
      "error": "Invalid data"
    });
  } else {
    db.todos.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updObj, {}, (err, result)=>{
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

//Delete todo
router.delete('/todo/:id', (req, res, next) => {
  db.todos.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;
