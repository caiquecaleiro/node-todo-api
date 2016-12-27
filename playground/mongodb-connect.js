const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server', err);
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert Todo', err);
    }
    console.log(JSON.stringify(result.ops, null, 2));
  });

  db.collection('Users').insertOne({
    name: 'Caique',
    age: 23,
    location: 'Blumenau'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert User', err);
    }
    console.log(result.ops[0]._id.getTimestamp());
  });

  db.close();
});