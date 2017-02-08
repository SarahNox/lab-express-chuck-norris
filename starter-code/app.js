const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('port 3000 in use')
});

app.get('/random', (request, response) => {
   client.getRandomJoke().then(function (res) {
      jokeValue = res.value;
        response.render("index", {joke: jokeValue});
    }).catch(function (err) {
        console.log("what are you doing here?");
    });
});

app.get('/categories', (request, response) => {
  client.getJokeCategories().then(function (res) {
      response.render("categories", {categories: res})
  }).catch(function (err) {
      console.log("no categories found");
  });
});

// not working
app.get('/categories/:category', (request, response) => {
  // response.send(`Chuck Norris Jokes in the category: ${request.params.category}`)
    client.getRandomJoke(request.params.category).then(function (res) {
      jokeValue = res.value;
      console.log(jokeValue);
          response.render("joke-by-category", {jokeCategory: jokeValue});
      }).catch(function (err) {
          console.log("no, that's not working");
    })
});

// client.search(searchTerm).then(function (response) {
//   app.get('/search', (req, res) => {
//     res.render('search');
//   });
// }).catch(function (err) {
//     console.log(err);
// });


// Free text search
// client.search(searchTerm).then(function (response) {
// app.get('/search', (req, res) => {
//     res.render('search')
// }).catch(function (err) {
//     console.log("not found");
// });
// });
