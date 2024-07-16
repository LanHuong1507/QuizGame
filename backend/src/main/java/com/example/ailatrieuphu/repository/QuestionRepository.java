package com.example.ailatrieuphu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ailatrieuphu.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    
}
