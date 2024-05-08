package com.had.authenticationservice.jwt;

import com.had.authenticationservice.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

/*
 * JwtService class typically contains the core functionality
 * related to JWT management, such as token generation, validation,
 * parsing, and possibly token refreshing.
 */
@Service
public class JwtService {

    @Value("${JWT_SECRET_KEY}")
    private String secretKey;

    private Key getSecretKey() {
        byte[] key = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(key);
    }

    /* JWT token generation */
    public String generateToken(User user) {
        return Jwts.builder().setSubject(user.getUsername())
                .claim("role", user.getRole())
                .claim("id", user.getId())
                .claim("name", user.getName())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24*60*60*1000)) //one day
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /* JWT token validation */
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String email = extractEmail(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    /* Parsing a claim from a token */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    /* Parsing all claims from a token */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSecretKey()).build().parseClaimsJws(token).getBody();
    }

    /* Parse subject claim from the token. The subject is user_email */
    public String extractEmail(String token){
        return extractClaim(token, Claims::getSubject);
    }
}
