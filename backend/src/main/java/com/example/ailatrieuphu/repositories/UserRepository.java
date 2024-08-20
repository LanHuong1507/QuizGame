package com.example.ailatrieuphu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ailatrieuphu.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    
}
