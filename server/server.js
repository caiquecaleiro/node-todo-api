const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const { ObjectID } = require('mongodb');

const Todo = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const { text } = req.body;
  const todo = new Todo({
    text
  });

  todo.save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({ todos });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = app;