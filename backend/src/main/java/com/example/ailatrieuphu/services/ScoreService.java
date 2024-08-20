package com.example.ailatrieuphu.services;

import com.example.ailatrieuphu.models.Score;
import com.example.ailatrieuphu.models.User;
import com.example.ailatrieuphu.repositories.ScoreRepository;
import com.example.ailatrieuphu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository, UserRepository userRepository) {
        this.scoreRepository = scoreRepository;
        this.userRepository = userRepository;
    }

    public Score saveScore(String username, int categoryId, int scoreValue) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            Score score = new Score();
            score.setUser(user);
            score.setCategoryId(categoryId);
            score.setScore(scoreValue);
            return scoreRepository.save(score);
        }
        throw new RuntimeException("User not found");
    }
}
