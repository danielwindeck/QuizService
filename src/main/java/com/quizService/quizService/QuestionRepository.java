package com.quizService.quizService;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String>, QuestionRepositoryCustom {

    List<Question> findByDifficulty(String difficulty);

    List<Question> findByCategory(String category);

    Question findOneByName(String name);

    Question findOneByAnswers(Object answers);

    Question findOneById(String Id);

}