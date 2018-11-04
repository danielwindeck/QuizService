package com.quizService.quizService;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {

    List<Question> findByDifficulty(String difficulty);

}