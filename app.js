//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "I feel like a writer today. Not like any old writer, but like myself. I have so much to say. Often, it all gets caught at in my throat and I choke. In those times I don't feel like myself. I don't feel like writer. But today is different. I am flowing steadily like a stream, and my thoughts are so fluid that they slip through my throat easily, sliding to make room for one another in the stream. No longer a blockade, but a waterfall of consciousness, frictionless and transcent to be easily recorded with pen and paper. Without friction, Today I have a frictionless meantal sky. I have so much to say. Now is the time. I'm ready to switch. I'm ready to make today my everyday. And so it is.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts = []

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.render('home', {
    homeContent: homeStartingContent,
    posts: posts
  })
})

app.get('/about', function (req, res) {
  res.render('about', {
    aboutContent: aboutContent
  })
})

app.get('/contact', function (req, res) {
  res.render('contact', {
    contactContent: contactContent
  })
})

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.get('/posts/:postName', function (req, res) {

  const requestedTitle = _.lowerCase(req.params.postName)
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title)
    if (requestedTitle === storedTitle) {
      res.render('post',{
        title: post.title,
        body: post.body
      })
    }
  })
})

app.post('/compose', function (req, res) {
  let post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }

  posts.push(post)
  res.redirect('/')
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});