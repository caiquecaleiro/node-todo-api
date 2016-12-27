const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server', err);
  }
  console.log('Connected to MongoDB server');

  // Fetch all todos
  db.collection('Todos').find().toArray()
    .then((docs) => {
      console.log('All Todos');
      console.log(JSON.stringify(docs, null, 2));
    })
    .catch((err) => {
      console.log('Unable to fetch Todos', err);
    });

  // Fetch todos that are not completed
  db.collection('Todos').find({ completed: false }).toArray()
    .then((docs) => {
      console.log('Todos not completed');
      console.log(JSON.stringify(docs, null, 2));
    })
    .catch((err) => {
      console.log('Unable to fetch Todos', err);
    });

  // Fetch todo by _id
  db.collection('Todos').find({ 
    _id: new ObjectID('5862b6a8232c0d3b4454d1b5') 
  }).toArray()
    .then((doc) => {
      console.log('Todos by _id');
      console.log(JSON.stringify(doc, null, 2));
    })
    .catch((err) => {
      console.log('Unable to fetch Todos', err);
    });

  // Count todos
  db.collection('Todos').find().count()
    .then((count) => {
      console.log(`Todos count: ${count}`);
    })
    .catch((err) => {
      console.log('Unable to count Todos', err);
    });

  db.close();
});