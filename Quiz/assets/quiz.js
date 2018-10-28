$(function(){

    var quizTemplate = ' <label class="element-animation1 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="1">1 One</label>' +
        '<label class="element-animation2 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="2">2 Two</label>' +
        '<label class="element-animation3 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">3 Three</label>' +
        '<label class="element-animation4 btn btn-lg btn-primary btn-block answere"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="4">4 Four</label>';


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
            url: "http://localhost:8080/greeting",
            data: {name: "Laura"},
            success: function(data) {
                console.info(data);

                $(".loader").addClass("hidden");
                $(".header-text").html("Frage aus Response");
                $(".quiz-screen").html(quizTemplate);
            },
            error: function() {
              alert("error");
            },
            dataType: "json"
        });
    });



/*    $(".answere").on('click', function () {
        var choice = $(this).find('input:radio').val();
        $('#loadbar').show();
        $('#quiz').fadeOut();
        setTimeout(function(){
            $( "#answer" ).html(  $(this).checking(choice) );
            $('#quiz').show();
            $('#loadbar').fadeOut();
            /!* something else *!/
        }, 4000);
    });

    $ans = 3;

    $.fn.checking = function(ck) {
        if (ck != $ans)
            return 'INCORRECT';
        else
            return 'CORRECT';
    };*/
});
