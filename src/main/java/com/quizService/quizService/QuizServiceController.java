package com.quizService.quizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QuizServiceController {

    @Autowired
    private QuestionRepository repository;

    @CrossOrigin(origins = "http://localhost:63342")
    @RequestMapping("/question")
    public Question question(@RequestParam(value="difficulty", defaultValue = "1") String difficulty) {
        Question result = new Question();
        final List<Question> questions = repository.findByDifficulty(difficulty);
        for (Question currentQuestion: questions) {
            result = currentQuestion;
        }

        return result;
    }

}

