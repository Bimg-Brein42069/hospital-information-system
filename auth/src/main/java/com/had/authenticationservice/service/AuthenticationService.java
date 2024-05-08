package com.had.authenticationservice.service;

import com.had.authenticationservice.dto.LoginRequest;
import com.had.authenticationservice.dto.SignupRequest;
import com.had.authenticationservice.jwt.JwtService;
import com.had.authenticationservice.model.Role;
import com.had.authenticationservice.model.User;
import com.had.authenticationservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public User signup(SignupRequest request){
        userRepository.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new IllegalArgumentException("User with email already exists");
        });
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

    public String login(LoginRequest request){

        //user with email does not exist
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new IllegalArgumentException("User with this email does not exist"));
        
        //user with email exists and correct password
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            String jwtToken = jwtService.generateToken(user);
            return jwtToken;
        } 
        //incorrect password
        catch (Exception e) {
            throw new BadCredentialsException("Incorrect password");
        }
    }

    public List<User> findByRole(Role role)
    {
        return userRepository.findByRole(role);
    }
}
