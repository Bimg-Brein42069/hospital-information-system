package com.had.authenticationservice.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Timestamp;
import java.util.Collection;
import java.util.List;

/*
 * For Spring Security, we need to implement UserDetails which
 * is an interface that represents core user information retrieved
 * by a UserDetailsService. It contains essential user details such as
 * username, password, authorities (roles), and whether the user's account
 * is enabled, expired, locked, or has credentials expired.
 */
@Data
@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Integer id;

    @Getter
    private String name;
    
    private String email;

    private String password;

    @Getter
    private Role role;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
