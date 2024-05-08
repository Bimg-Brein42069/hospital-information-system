package com.had.authenticationservice.service;

import com.had.authenticationservice.model.Role;
import com.had.authenticationservice.model.User;
import com.had.authenticationservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /*
     * This code configures a UserDetailsService bean that
     * loads user details from a repository (userRepository)
     * based on the provided username (email) and throws an
     * exception if the user is not found. This bean is typically
     * used by Spring Security for authentication purposes to retrieve
     * user details during the authentication process.
     */
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User with this email not found"));
            }
        };
    }

    public void deleteUser(int userId){
        Optional<User> optionalUser=userRepository.findById(userId);
        if(optionalUser.isEmpty() || optionalUser.get().getRole() == Role.ADMIN)
            return ;
        userRepository.deleteById(userId);
    }
}
