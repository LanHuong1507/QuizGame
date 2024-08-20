package com.example.ailatrieuphu.controllers;

import com.example.ailatrieuphu.models.Score;
import com.example.ailatrieuphu.models.User;
import com.example.ailatrieuphu.repositories.ScoreRepository;
import com.example.ailatrieuphu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ScoreController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @PostMapping("/saveScore")
    public void saveScore(@RequestBody ScoreRequest scoreRequest) {
        // Find or create the user
        User user = userRepository.findByUsername(scoreRequest.getUsername());
        if (user == null) {
            user = new User();
            user.setUsername(scoreRequest.getUsername());
            // Set other fields if necessary
            userRepository.save(user);
        }

        // Save the score
        Score score = new Score();
        score.setUser(user);
        score.setCategoryId(scoreRequest.getCategoryId());
        score.setScore(scoreRequest.getScore());
        scoreRepository.save(score);
    }
}

class ScoreRequest {
    private String username;
    private int categoryId;
    private int score;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
