//                      /$$                 /$$       /$$                                 /$$             /$$    
//                     | $$                | $$      | $$                                | $$            | $$    
//   /$$$$$$   /$$$$$$ | $$  /$$$$$$       | $$$$$$$ | $$ /$$   /$$  /$$$$$$         /$$$$$$$  /$$$$$$  /$$$$$$  
//  /$$__  $$ |____  $$| $$ /$$__  $$      | $$__  $$| $$| $$  | $$ /$$__  $$       /$$__  $$ /$$__  $$|_  $$_/  
// | $$  \ $$  /$$$$$$$| $$| $$$$$$$$      | $$  \ $$| $$| $$  | $$| $$$$$$$$      | $$  | $$| $$  \ $$  | $$    
// | $$  | $$ /$$__  $$| $$| $$_____/      | $$  | $$| $$| $$  | $$| $$_____/      | $$  | $$| $$  | $$  | $$ /$$
// | $$$$$$$/|  $$$$$$$| $$|  $$$$$$$      | $$$$$$$/| $$|  $$$$$$/|  $$$$$$$      |  $$$$$$$|  $$$$$$/  |  $$$$/
// | $$____/  \_______/|__/ \_______/      |_______/ |__/ \______/  \_______/       \_______/ \______/    \___/  
// | $$                                                                                                          
// | $$                                                                                                          
// |__/ 

// Jquery function to wrap everything
// -----------------------------------------------------------------
$(document).ready(function() {

    // Variables
    // -------------------------------------------------------------

    // Stop Clock 
    var counter = 61;
    // used for stop clock interval
    var intervalId;
    // Used to display the question number
    var questionNumber = 0
        // Stores number of correctly answered questions
    var questionCorrect = 0
        // Stores number of incorrectly answered questions
    var questionWrong = 0
        // user's response collected in an array
    var responseArray = []
        // Correct Answer Array
    var answerArray = ["Pacific Ocean", "center of the earth", "Australia", "Sahara", "nitrogen", "20%", "USA", "Wrangell-St. Elias", "Australia", "January"]
    console.log(answerArray)

    // Elements will fade into the page upon load
    $(".pageheader").hide();
    $("#subHeader").hide();
    $("#instructions").hide();
    $(".startbutton").hide();
    $(".questionPanel").hide();
    $(".theTimer").hide();
    $(".questionColumn").hide();
    $(".FinishScreen").hide();
    $(".pageheader").delay(1000).fadeIn(1000);
    $("#subHeader").delay(2500).fadeIn(1000);
    $("#instructions").delay(3500).fadeIn(1000);
    $(".startbutton").delay(3700).fadeIn(1000);

    // Clicking the start button hides the welcome screen and starts game
    $(".startbutton").on("click", function() {
        $(".theTimer").show();
        $("#instructions").hide();
        $(".startbutton").hide();
        $(".FinishScreen").hide();
        $(".questionPanel").delay(500).fadeIn(500);
        startGame()
    })

    // Start the Game
    // -------------------------------------------------------------
    function startGame() {
        // start the clock when user begins game
        intervalId = setInterval(decrement, 1000);

        function decrement() {
            counter--;
            $("#show-number").html(counter)
                // when the timer hits zero...
            if (counter === -1) {
                //...run the tally function.
                // tally();
                console.log("hit zero")
                    // run the function that tallys answers and displays score
                tally()
            }
        }

        // show the question div
        $(".questionColumn").fadeIn(500);

        // Reset game parameters
        var questionNumber = 0
        var questionCorrect = 0
        var questionWrong = 0

        //if the user finishes the quiz before 60 seconds and wants to skip to the tally
        $(".finish").on("click", function() {
            tally()
        })


    // startGame Wrap    
    }

    // Function to tally up the score
    // -------------------------------------------------------------
    function tally() {
        // store user input in variables
        var AOne = $('input:radio[name="question1"]:checked').val();
        var ATwo = $('input:radio[name="question2"]:checked').val();
        var AThree = $('input:radio[name="question3"]:checked').val();
        var AFour = $('input:radio[name="question4"]:checked').val();
        var AFive = $('input:radio[name="question5"]:checked').val();
        var ASix = $('input:radio[name="question6"]:checked').val();
        var ASeven = $('input:radio[name="question7"]:checked').val();
        var AEight = $('input:radio[name="question8"]:checked').val();
        var ANine = $('input:radio[name="question9"]:checked').val();
        var ATen = $('input:radio[name="question10"]:checked').val();
        // push the variables into an array
        responseArray.push(AOne, ATwo, AThree, AFour, AFive, ASix, ASeven, AEight, ANine, ATen)
        console.log(responseArray)

        // compare the user and correct answer arrays
        for (i = 0; i < answerArray.length; i++) {
            if (responseArray[i] === answerArray[i]) {
                questionCorrect++
            } else {
                questionWrong++
            }
        }

        // Hide the Question Div and show the Finish Page div
        console.log(questionWrong)
        console.log(questionCorrect)
        $(".questionColumn").hide();
        $(".theTimer").hide();
        $(".FinishScreen").show();
        // Display Correct and Incorrect Responses
        $("#rightResponses").html(questionCorrect)
        $("#wrongResponses").html(questionWrong)

    // tally Wrap      
    }

    // jQeury Wrap 
});
