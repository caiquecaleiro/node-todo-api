const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server', err);
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate(
    { _id: new ObjectID('5862b6af2572a000e85856f4')}, 
    { $set: { completed: true }}, 
    { returnOriginal: false})
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log('Unable to update the Todo', err);
    });

  db.collection('Users').findOneAndUpdate(
    { _id: new ObjectID('5862bb2d3727e21d148b4a79')}, 
    { 
      $set: { name: 'Thomas' },
      $inc: { age: 1 }
    }, 
    { returnOriginal: false})
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log('Unable to update the Todo', err);
    });

  db.close();
});