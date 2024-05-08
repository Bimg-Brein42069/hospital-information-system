package com.had.authenticationservice.controller;

import com.had.authenticationservice.dto.LoginRequest;
import com.had.authenticationservice.dto.SignupRequest;
import com.had.authenticationservice.model.Role;
import com.had.authenticationservice.model.User;
import com.had.authenticationservice.service.AuthenticationService;
import com.had.authenticationservice.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request){
        
        //if user with email does not exist
        try {
            return ResponseEntity.ok(authenticationService.signup(request));
        } 
        //if user with email already exists
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } 
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request){

        //if user with email is there and correct password
        try {
            return ResponseEntity.ok(authenticationService.login(request));
        } 
        //incorrect email
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        //incorrect password
        catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-doctors")
    public List<User> getDoctors()
    {
        return authenticationService.findByRole(Role.DOCTOR);
    }

    @Autowired
    private UserService userService;

    @DeleteMapping("/delete-user")
    public void deleteUser(@RequestParam int userId){
        userService.deleteUser(userId);
    }
}
