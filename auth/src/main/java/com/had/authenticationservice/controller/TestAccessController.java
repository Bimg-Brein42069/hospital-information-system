package com.had.authenticationservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Testing if role based access control of APIs is working.
 */

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class TestAccessController {

    @GetMapping("/api/accessonlytodoctors")
    public ResponseEntity<String> sayHelloToDoctors() {
        return ResponseEntity.ok("Hello Doctors");
    }

    @GetMapping("/api/accessonlytoreceptionists")
    public ResponseEntity<String> sayHelloToReceptionists() {
        return ResponseEntity.ok("Hello Receptionists");
    }
}
