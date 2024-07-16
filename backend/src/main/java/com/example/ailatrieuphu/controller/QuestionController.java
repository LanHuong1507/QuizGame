package com.example.ailatrieuphu.controller;

import com.example.ailatrieuphu.model.Question;
import com.example.ailatrieuphu.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    // Get all questions
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return ResponseEntity.ok(questions);
    }

    // Get a single question by ID
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Optional<Question> question = questionRepository.findById(id);
        return question.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    // Create a new question
    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        Question createdQuestion = questionRepository.save(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
    }

    // Update an existing question
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @RequestBody Question questionDetails
    ) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question updatedQuestion = optionalQuestion.get();
            updatedQuestion.setQuestionText(questionDetails.getQuestionText());
            updatedQuestion.setOptionA(questionDetails.getOptionA());
            updatedQuestion.setOptionB(questionDetails.getOptionB());
            updatedQuestion.setOptionC(questionDetails.getOptionC());
            updatedQuestion.setOptionD(questionDetails.getOptionD());
            updatedQuestion.setCorrectAnswer(questionDetails.getCorrectAnswer());
            Question savedQuestion = questionRepository.save(updatedQuestion);
            return ResponseEntity.ok(savedQuestion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a question
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            questionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}