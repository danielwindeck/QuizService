package com.quizService.quizService;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questions")
public class Question {

    @Id
    public String id;

    public String difficulty;
    public String category;
    public String name;
    public Object answers;

    public Question() {}

    public Question(String difficulty, String category, String name, Object answers) {
        this.difficulty = difficulty;
        this.category = category;
        this.name = name;
        this.answers = answers;
    }
}
