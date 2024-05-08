package com.had.authenticationservice.repository;

import com.had.authenticationservice.model.Role;
import com.had.authenticationservice.model.User;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
}
