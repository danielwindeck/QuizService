package com.quizService.quizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("quizService/api/v1")
public class QuizServiceController {

    @Autowired
    private QuestionRepository repository;

    @GetMapping("/questions")
    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    @GetMapping("/questions/{id}")
    public Question getQuestionById(@PathVariable(value="id") String id) {
        return repository.findOneById(id);
    }

    @GetMapping("/questions/difficulty/{difficulty}")
    public List<Question> getQuestionsByDifficulty(@PathVariable(value = "difficulty") String difficulty,
                                                   @RequestParam(value = "random", required = false) Boolean random) {
        if(random == null) {
            return repository.findByDifficulty(difficulty);
        }
        return repository.getRandomQuestionByDifficulty(difficulty);
    }

    @GetMapping("/questions/category/{category}")
    public List<Question> getQuestionsByCategory(@PathVariable(value = "category") String category,
                                                 @RequestParam(value = "random", required = false) Boolean random) {
        if(random == null) {
            return repository.findByCategory(category);
        }
        return repository.getRandomQuestionByCategory(category);
    }

    @GetMapping("/questions/name/{name}")
    public Question getQuestionsByName(@PathVariable(value = "name") String name) {
        return repository.findOneByName(name);
    }

    @GetMapping("/questions/answers/{answers}")
    public Question getQuestionsByAnswers(@PathVariable(value = "answers") Object answers) {
        return repository.findOneByAnswers(answers);
    }
}

