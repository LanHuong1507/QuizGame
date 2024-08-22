package com.example.ailatrieuphu.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ailatrieuphu.enums.Level;
import com.example.ailatrieuphu.models.Question;
import com.example.ailatrieuphu.repositories.QuestionRepository;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }
    public int calculateTotalPoints(Set<Long> correctQuestionIds) {
        List<Question> questions = questionRepository.findAllById(correctQuestionIds);
        return questions.stream()
                        .mapToInt(Question::getPoint)
                        .sum();
    }

    public Set<Question> getQuestionsByCategoryAndLevel(Long categoryId, Level level) {
        return questionRepository.findQuestionsByCategoryIdAndLevel(categoryId, level);
    }
}
