package com.example.ailatrieuphu.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ailatrieuphu.enums.Level;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/levels")
public class LevelController {

    @GetMapping
    public ResponseEntity<List<String>> getLevels() {
        // Return the names of the levels from the enum
        List<String> levels = Arrays.stream(Level.values())
                                    .map(Level::name)
                                    .collect(Collectors.toList());
        return ResponseEntity.ok(levels);
    }
}
