var db = require("../models");
var rp = require("request-promise");
var _ = require('underscore');
var path = require("path");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

var newTrivia;



Array.prototype.shuffle = function () {
  var i = this.length, j, temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}


rp("https://opentdb.com/api.php?amount=20&category=18")
  .then(function (body) {


    var data = JSON.parse(body);

    var myTrivia = data.results;
    var filteredTrivia = _.where(myTrivia, { type: "multiple" });

    // console.log(filteredTrivia);
    newTrivia = filteredTrivia.map(trivia => ({

      question: entities.decode(trivia.question),
      options: [
        entities.decode(trivia.incorrect_answers[0]),
        entities.decode(trivia.incorrect_answers[1]),
        entities.decode(trivia.incorrect_answers[2]),
        entities.decode(trivia.correct_answer),
      ].shuffle(),
      correctAnswer:entities.decode(trivia.correct_answer),
      difficulty: trivia.difficulty,
      type: trivia.type
    }));

    // console.log(newTrivia);
  });



//**************************************************** API CALL *********************************************************





//**************************************************** MARTIN CODE *********************************************************

module.exports = function (app) {
  // Load index page


  app.get("/trivia", function (req, res) {

    res.render("trivia", {
      trivia: newTrivia

    });
  });

  app.post("/", function (req, res) {


  })



  // Load example page and pass in an example by id
  app.get("/trivia/:id?", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/about",function(req, res) {
    res.render("about", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

