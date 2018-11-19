$(function(){

    var quizTemplate = '<label class="element-animation1 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="ANSWER1">ANSWER1</label>' +
        '<label class="element-animation2 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="ANSWER2">ANSWER2</label>' +
        '<label class="element-animation3 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="ANSWER3">ANSWER3</label>' +
        '<label class="element-animation4 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="ANSWER4">ANSWER4</label>';

    var correctValue = "";
    var questionDifficulty = 1;

    $(document)
        .ajaxStart(function () {
            console.info("ajax started");

            $(".quiz-screen").html("");
            $(".loader").removeClass("hidden");

        }).ajaxStop(function () {
            console.info("ajax ended");
    });

    //Start Game
    $("#startGame").on("click", function() {
        getQuestion("difficulty/");
    });

    function getQuestion(requestParam) {
        $.ajax({
            url: "http://localhost:8080/quizService/api/v1/questions/" + requestParam + questionDifficulty,
            data: {random: true},
            success: function(data) {
                displayQuestion(data);
            },
            error: function() {
                alert("error");
            },
            dataType: "json"
        });
    }

    function displayQuestion(question) {
        question = question[0];
        $(".loader").addClass("hidden");

        var answers = question.answers;

        $(".header-text").html(question.name);

        $(".quiz-screen").children().remove();

        var answereElement = resolveTemplate(answers);

        $(".quiz-screen").append(answereElement);
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
                questionDifficulty++;
                if(questionDifficulty === 4) {
                    console.info("Spiel zu Ende, keine Fragen mehr");
                    location.reload();
                }
                getQuestion("difficulty/");
            }
            else {
                console.info("Wrong");
                location.reload();
            }
        }
    });

});
