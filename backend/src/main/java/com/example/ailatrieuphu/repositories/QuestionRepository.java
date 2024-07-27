package com.example.ailatrieuphu.repositories;

import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ailatrieuphu.models.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("SELECT q FROM Question q JOIN q.categories c WHERE c.id = :categoryId")
    Set<Question> findQuestionsByCategoryId(@Param("categoryId") Long categoryId);
}
