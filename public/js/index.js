// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);





//**************************************************** MARTIN CODE *********************************************************/


document.addEventListener("keydown", function () {
  var nonBoolean = [];




  console.log("keyed");
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://opentdb.com/api.php?amount=20&category=18');
  ourRequest.onload = function () {
    var ourData = JSON.parse(ourRequest.responseText);
    console.log("------Data-----")
    //this is the data
    console.log(ourData);
    //access the array with the property name after the variable
    console.log(ourData.results);
    //ask team what they want to name arrayQ (50 questions), each question is an object
    var arrayQ = ourData.results;
    for (let i = 0; i < arrayQ.length; i++) {
      if (arrayQ[i].type == "multiple") {
        nonBoolean.push(arrayQ[i]);

      }
    }

    //*****this is the final array of questions, stored as object
    // console.log(arrayQ);
    //make a for loop of each question in the array


    var content = nonBoolean.map(function (eachEvent) {

      return {
        question: eachEvent.question,
        options: [
          { q: eachEvent.incorrect_answers[0] },

          { q: eachEvent.incorrect_answers[1] },
          { q: eachEvent.incorrect_answers[2] },
          { q: eachEvent.correct_answer },
        ],

        correctAnswer: eachEvent.correct_answer,
        difficulty: eachEvent.difficulty,
        type: eachEvent.type
      }
    })



    // loop through all the question sort out question types // possibly difficulty level

    var html = "";

    for (let i = 0; i < content.length; i++) {
    


      // if (content[i].type !== "boolean") {

      var questionArray = content[i].options;
    

      var lastNumber = [];
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
      console.log(questionArray);
      console.log(tempArray);
  
      var results = [];

      results.push(content);
      
      results.push(tempArray);

      console.log(results);
      





      var postHTML = ` 
      
      
      <div class="post${i === 0 ? " active" : ""}">
          <p>${i + 1}/${content.length}</p>
          <h1 class="post-question" id ="question">${content[i].question}</h1>

          <h4 class="post-options" id="q1">:${tempArray[0].q}
          <button name="btn-q1" type="submit value="incorrect"></button>  
          </h4>
          <h4 class="post-options" id="q2">:${tempArray[1].q}
          <button name="btn-q2" type="submit value="incorrect"></button>  
          </h4>
          <h4 class="post-options" id="q3">:${tempArray[2].q}</p>
          <button name="btn-q3" type="submit value="incorrect"></button>  

          <h4 class="post-options" id="q4">:${tempArray[3].q}</p>
          <button name="btn-q4" type="submit value=""></button>  
      </div>
  `;

      html += postHTML;
    };

    console.log(html);


    // console.log(html);


    $('#answer-div').html(html);


  };

  //**************************************************** MARTIN CODE *********************************************************/

  // if type = multiple then display/show info with three buttons per Question , if boolean display just one question with a button 


  //send request


  ourRequest.send();
  //access the request api database 
  console.log(ourRequest);
  console.log("getting the data");
  console.log(ourRequest[1]);
  console.log("above is undefined");
  console.log("do not show");
});
