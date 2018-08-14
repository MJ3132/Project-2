var nonBoolean = [];


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
    });

    // loop through all the question 

    var html = "";

    // for (let i = 0; i < content.length; i++) {
    //     if (!content[i].type == "boolean") {

    //         continue

    //     }

    
        //shuffle question values

        var questionArray = content[i].options;
        console.log(questionArray);

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

        console.log(tempArray);
        console.log(content);
        console.log(nonBoolean);

        var result = [];
        result += nonBoolean;
        result += tempArray;


//         var postHTML = ` 
      
//       <div class="post${i === 0 ? " active" : ""}">
//           <p>${i + 1}/${content.length}</p>
//           <h1 class="post-question" id ="question">${content[i].question}</h1>

//           <h4 class="post-options" id="q1">:${tempArray[0].q}
//           <button name="btn-q1" type="submit value="incorrect"></button>  
//           </h4>
//           <h4 class="post-options" id="q2">:${tempArray[1].q}
//           <button name="btn-q2" type="submit value="incorrect"></button>  
//           </h4>
//           <h4 class="post-options" id="q3">:${tempArray[2].q}</p>
//           <button name="btn-q3" type="submit value="incorrect"></button>  

//           <h4 class="post-options" id="q4">:${tempArray[3].q}</p>
//           <button name="btn-q4" type="submit value=""></button>  
//       </div>
//   `;

        // html += postHTML;
    };

    // console.log(html);


    // console.log(html);


    $('#answer-div').html(html);

    module.exports = { nonBoolean,
                        tempArray 
                    };


//**************************************************** MARTIN CODE *********************************************************/

// if type = multiple then display/show info with three buttons per Question , if boolean display just one question with a button 


//send request


// ourRequest.send();
// //access the request api database 
// console.log(ourRequest);
// console.log("getting the data");
// console.log(ourRequest[1]);
// console.log("above is undefined");
// console.log("do not show");
// });