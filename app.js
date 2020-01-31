//jshint esversion:6

const mongoose = require('mongoose');

//useNewUrlParser app_mongo.js de farkli kadinda orada da asagidaki gibi idi ama bende yine farkli olmasina ragmen ayni sekilde calisti!!!!
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please check your data entry, no name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});


const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
  name: 'mandalina',
  rating: 4,
  review: "great"
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema//This tells mongoose that we are embedding a fruit document inside this property called favorite fruit in our person document.
});

const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
  name: 'pineapple',
  score: 9,
  review: 'great fruit'
});

pineapple.save();

Person.updateOne({name: 'amy'}, {favouriteFruit: 'mango'}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('succesfully updated');
  }
});

const person = new Person({
  name: "amy",
  age: 12,
  favouriteFruit: pineapple
});

person.save();

///////////////////////////////////////
//bu kismi sildi sonra score keyini anlamadim yukarida rating burada score???

// const orange = new Fruit({
//   name: "orange",
//   score: 5,
//   review: "the fruit"
// });

// const banana = new Fruit({
//   name: "banana",
//   score: 4,
//   review: "the good fruit"
// });

// const kiwi = new Fruit({
//   name: "kiwi",
//   score: 10,
//   review: "the best fruit"
// });

// Fruit.insertMany([orange, banana, kiwi], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('successful saved all the fruits to fruitsDB')
//   }
// });
////////////////////////////////


//reading from your database with mongoose
Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    // console.log(fruits);
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
    mongoose.connection.close();
  }
});

// Fruit.updateOne({_id: '5e340abd36a94b523802b48e'}, {name: 'peach'}, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('succesfully updated');
//   }
// });

// Fruit.deleteOne({name: 'peach'}, function (err) {
//   if (err) return handleError(err);
//   // deleted at most one tank document
// });

Fruit.deleteMany({ name: 'mandalina' }, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};