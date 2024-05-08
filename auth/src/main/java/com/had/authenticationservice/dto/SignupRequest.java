package com.had.authenticationservice.dto;

import com.had.authenticationservice.model.Role;
import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
