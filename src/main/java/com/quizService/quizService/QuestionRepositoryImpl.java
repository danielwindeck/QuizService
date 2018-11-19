package com.quizService.quizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;

public class QuestionRepositoryImpl implements QuestionRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public QuestionRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public List<Question> getRandomQuestionByDifficulty(String difficulty) {
        return getRandomDbValue("difficulty", difficulty, "questions");
    }

    @Override
    public List<Question> getRandomQuestionByCategory(String category) {
        return getRandomDbValue("category", category, "questions");
    }

    private List<Question> getRandomDbValue(final String dbField, final String aggregationValue, final String collectionName) {
        Aggregation agg = Aggregation.newAggregation(
                Aggregation.match(Criteria.where(dbField).is(aggregationValue)),
                Aggregation.sample(1)
        );

        AggregationResults<Question> groupResults =
                mongoTemplate.aggregate(agg, collectionName, Question.class);
        List<Question> result = groupResults.getMappedResults();

        return result;
    }
}
