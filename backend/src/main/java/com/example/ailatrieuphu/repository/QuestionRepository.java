package com.example.ailatrieuphu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ailatrieuphu.models.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    
}
