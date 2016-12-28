const { ObjectID } = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo');

Todo.remove({})
  .then((result) => {
    console.log(result);
  });

Todo.findOneAndRemove({ text: 'Text'})
  .then((result) => {
    console.log(result);
  });

Todo.findByIdAndRemove('5863b831c263851e38f491bc')
  .then((result) => {
    console.log(result);
  });