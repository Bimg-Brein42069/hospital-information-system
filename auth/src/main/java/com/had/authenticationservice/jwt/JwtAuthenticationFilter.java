package com.had.authenticationservice.jwt;

import com.had.authenticationservice.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/*
 * JwtAuthenticationFilter intercepts incoming HTTP
 * requests, extracts JWT tokens from the request
 * headers or other locations, and performs authentication
 * based on the information provided in the JWT tokens.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;    //for parsing the token to get user_email
    private final UserService userService;  //for fetching the user details from database using email
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;  //the jwt token
        final String email;     //the user email

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            //jwt token is not passed, forward the request
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authHeader.substring(7);
        email = jwtService.extractEmail(jwtToken);

        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(email);

            /*
             * We are authenticating the user represented by userDetails based on the provided
             * JWT token (jwtToken). After authentication, the user's details and authorities
             * are stored in the security context, allowing Spring Security to enforce access
             * control and apply security policies for subsequent requests.
             */
            if(jwtService.isTokenValid(jwtToken, userDetails)){
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                securityContext.setAuthentication(authToken);
                SecurityContextHolder.setContext(securityContext);
            }
        }
        filterChain.doFilter(request, response);
    }
}
