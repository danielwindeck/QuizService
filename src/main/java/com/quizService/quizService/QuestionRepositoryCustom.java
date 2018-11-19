package com.quizService.quizService;

import java.util.List;

public interface QuestionRepositoryCustom {

    List<Question> getRandomQuestionByDifficulty(String difficulty);

    List<Question> getRandomQuestionByCategory(String category);

}
