
let carouselIndex = 0;

var totalScore = 0;

var timer = 0;


$(document).ready(function (){
    var count = 60 * 16;
    var timer = setInterval(function() {
        $("#counter").html(count--);
        if(count === -1) {
        clearInterval(timer);
        console.log("done timer");
        $("#counter").html("Time's up")
        //add code on this line to go to next question
        nextQuestion();
        // location.reload();
        }
    }, 1000);
})

$(".btn").on("click", function (event) {

    clearInterval(timer);


var correctChoice = document.getElementById(`question-${carouselIndex}`).dataset;
// var finalChoice = correctChoice[value];

// correctChoice.assign({}

var correctString = Object.values(correctChoice).toString();

console.log(correctString);

var userChoice = $(this).text().trim();

console.log(userChoice);



// console.log(document.getElementById(`answer-btn-${carouselIndex}`).dataset);

console.log("now on the next question at index", carouselIndex);

    $('#carouselExampleSlidesOnly').carousel('next');
    carouselIndex++;

    


    if (userChoice == correctString){
        console.log("correct");
        addScore();
    } else {
        console.log("wrong");
    }

    function addScore(){
        totalScore = totalScore + 10;
        //update score 
        $("#score").text(totalScore);
        console.log("Total Score: " + totalScore);
    }
    

});


    // $.post('/api/trivia', triviaInfo, function (data) {




    // })




