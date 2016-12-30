require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const cors = require('cors');

const mongoose = require('./db/mongoose');
const Todo = require('./models/todo');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

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
      res.status(400).send({ error: 'Unable to save the Todo.' });
    });
});

app.get('/todos', (req, res) => {
  Todo.find().sort({ completed: 1, _id: -1 })
    .then((todos) => {
      res.send({ todos });
    })
    .catch((error) => {
      res.status(400).send({ error: 'Unable to get the Todos.' });
    });
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: 'Could not get the Todo because the ID is invalid.' });
  }

  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({ error: 'This Todo does not exist.' });
      }
      res.send({ todo });
    })
    .catch((error) => {
      res.status(400).send({ error: 'Unable to find the Todo.' });
    });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: 'Could not delete the Todo because the ID is invalid.' });
  }
  
  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({ error: 'Could not delete the Todo because the ID does not exist.' });
      }
      res.send({ todo });
    })
    .catch((error) => {
      res.status(404).send({ error: 'Unable to delete the Todo.' });
    });
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: 'Could not update the Todo because the ID is invalid.' });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({ error: 'Could not update the Todo because the ID does not exist.' });
      }
      res.send({ todo });
    })
    .catch((error) => {
      res.status(400).send({ error: 'Unable to update the Todo.' });
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = app;