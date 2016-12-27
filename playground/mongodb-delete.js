const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server', err);
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  db.collection('Todos').deleteMany({ text: 'Eat lunch' })
    .then((result) => {
      console.log('Todos delete', result);
    })
    .catch((err) => {
      console.log('Unable to delete the todos');
    });

  // deleteOne
  db.collection('Todos').deleteOne({ text: 'Eat lunch' })
    .then((result) => {
      console.log('Todos delete', result);
    })
    .catch((err) => {
      console.log('Unable to delete the todos');
    });

  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({ completed: false })
    .then((result) => {
      console.log('Todo delete', result);
    })
    .catch((err) => {
      console.log('Unable to delete the todos');
    });

  db.collection('Users').deleteMany({ name: 'Potter' })
    .then((result) => {
      console.log('Deleted the Users', result);
    })
    .catch((err) => {
      console.log('Unable to delete the Users');
    });

  db.collection('Users').findOneAndDelete({ _id: new ObjectID('5862b7e9dc06e70a00381fd7')})
    .then((result) => {
      console.log('User deleted', result);
    })
    .catch((err) => {
      console.log('Unable to delete the user by id');
    });

  db.close();
});