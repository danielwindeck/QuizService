package com.quizService.quizService;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    private String difficulty;
    private String category;
    private String name;
    private Object answers;

    public String getId() {
        return this.id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getDifficulty() {
        return this.difficulty;
    }

    public void setDifficulty(final String difficulty) {
        this.difficulty = difficulty;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(final String category) {
        this.category = category;
    }

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public Object getAnswers() {
        return this.answers;
    }

    public void setAnswers(final Object answers) {
        this.answers = answers;
    }

    public Question() {}

    public Question(String difficulty, String category, String name, Object answers) {
        this.difficulty = difficulty;
        this.category = category;
        this.name = name;
        this.answers = answers;
    }
}
