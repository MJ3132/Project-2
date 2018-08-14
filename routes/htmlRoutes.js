var db = require("../models");
var result = [];

function start() {

  // multiple question array "no booleans"
  var nonBoolean = [];

  // TRIVIA API CALL 
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://opentdb.com/api.php?amount=20&category=18');
    var ourData = JSON.parse(ourRequest.responseText);
    console.log("------Data-----")
    //this is the data
    console.log(ourData);
    //access the array with the property name after the variable
    console.log(ourData.results);
    //ask team what they want to name arrayQ (50 questions), each question is an object
    var arrayQ = ourData.results;

    // filter boolean questions, store them in nonboolean array

    for (let i = 0; i < arrayQ.length; i++) {
      if (arrayQ[i].type == "multiple") {
        nonBoolean.push(arrayQ[i]);

      }
    }

    // make a new array named content in order to arrange the options order the options 

    var content = nonBoolean.map(function (eachEvent) {
      return {
        question: eachEvent.question,
        options: [
          { op: eachEvent.incorrect_answers[0] },

          { op: eachEvent.incorrect_answers[1] },
          { op: eachEvent.incorrect_answers[2] },
          { op: eachEvent.correct_answer },
        ],

        correctAnswer: eachEvent.correct_answer,
        difficulty: eachEvent.difficulty,
        type: eachEvent.type
      }
    })



    // loop through all the content array 



    for (let i = 0; i < content.length; i++) {

      // if (content[i].type !== "boolean") {

      var questionArray = content[i].options;


      // holds random numbers from 1-4
      var lastNumber = [];

      // holds the shuffled options
      var tempArray = [];

      for (var j = 0; j < 4; j++) {
        var randomNumber = function () {

          var x = Math.floor((Math.random() * 4));

          if (!lastNumber.includes(x)) {

            tempArray[x] = questionArray[j];

            lastNumber.push(x);


          } else {
            randomNumber();
          }
        }
        randomNumber();
      };
      // console.log(nonBoolean);

      //unshuffled options
      console.log(questionArray);

      //shuffled options
      console.log(tempArray);

      // storing in result array original api question array & shuffled questions for handlebar rendering

      result.push(content);
      result.push(tempArray);

      console.log(result);
    }

    //**************************************************** MARTIN CODE *********************************************************

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {

    start();
      res.render("index", {
        result : result
   
    });
  });


  app.get("/", function(req, res) {

    start();
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/trivia/:id?", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

}