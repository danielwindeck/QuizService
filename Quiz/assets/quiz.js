$(function(){

    var quizTemplate = '<label class="element-animation1 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value=ANSWER1>ANSWER1</label>' +
        '<label class="element-animation2 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value=ANSWER2>ANSWER2</label>' +
        '<label class="element-animation3 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value=ANSWER3>ANSWER3</label>' +
        '<label class="element-animation4 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value=ANSWER4>ANSWER4</label>';

    var correctValue = "";
    var questionDifficulty = 1;
    /*
    * Beim Start des Spiels den Inhalt von .quizScreen leeren
    * Beim korrekten beantworten der Frage neuer ajax requestm dabei soll der akuelle quizScreen nur in seinem Inhalt geupdatet werden
    * */


    $(document)
        .ajaxStart(function () {
            console.info("ajax started");

            $(".quiz-screen").html("");
            $(".loader").removeClass("hidden");


           // $(".start-screen").addClass("hidden");

        }).ajaxStop(function () {
            console.info("ajax ended");
    });


    //Start Game
    $("#startGame").on("click", function() {
        $.ajax({
            url: "http://localhost:8080/question",
            data: {difficulty: questionDifficulty},
            success: function(data) {
                displayQuestion(data);
            },
            error: function() {
              alert("error");
            },
            dataType: "json"
        });
    });


    function displayQuestion(question) {
        $(".loader").addClass("hidden");

        var answers = question.answers;

        $(".header-text").html(question.name);

        $(".quiz-screen").children().remove();

        var answereElement = resolveTemplate(answers);

        $(".quiz-screen").append(answereElement);

        console.info(correctValue);
    }

    function resolveTemplate(answers) {
        var template = quizTemplate;
        var result = "";
        var counter = 1;

        _.forEach(answers, function(value, key) {
            if(value === "true") {
                correctValue = key;
            }

            switch(counter) {
                case 1:
                    result = template.replace(/ANSWER1/g, key);
                    break;
                case 2:
                    result = result.replace(/ANSWER2/g, key);
                    break;
                case 3:
                    result = result.replace(/ANSWER3/g, key);
                    break;
                case 4:
                    result = result.replace(/ANSWER4/g, key);
                    break;
            }

            counter ++;
        });

        return result;
    }

    $(".quiz-screen").on("click", function(event){
        var element = $(event.target);
        if(element.hasClass("answere")) {
            var userValue = element.find("input").val();

            if(userValue === correctValue) {
                console.info("Correct");
            }
            else {
                console.info("Wrong");
            }
        }
    });

});
