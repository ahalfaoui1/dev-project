package com.crm.backend.security.services;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crm.backend.exception.TokenRefreshException;
import com.crm.backend.models.RefreshToken;
import com.crm.backend.repository.RefreshTokenRepository;
import com.crm.backend.repository.UserRepository;

@Service
public class RefreshTokenService {
  @Value("${crm.back.jwtRefreshExpirationMs}")
  private Long refreshTokenDurationMs;

  @Autowired
  private RefreshTokenRepository refreshTokenRepository;

  @Autowired
  private UserRepository userRepository;
  public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
      this.refreshTokenRepository = refreshTokenRepository;
      this.userRepository = userRepository;
  }
  
  public Optional<RefreshToken> findByToken(String token) {
    return refreshTokenRepository.findByToken(token);
  }

 public RefreshToken createRefreshToken(Long userId) {
      // Check if a refresh token already exists for the user
      Optional<RefreshToken> existingRefreshToken = refreshTokenRepository.findByUser_Id(userId);

      RefreshToken refreshToken;

      if (existingRefreshToken.isPresent()) {
          // If a refresh token exists, update it
          refreshToken = existingRefreshToken.get();
          refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
          // You may update other properties if needed
      } else {
          // If no refresh token exists, create a new one
          refreshToken = new RefreshToken();
          refreshToken.setUser(userRepository.findById(userId).orElseThrow()); // You may need error handling here
          refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
          refreshToken.setToken(UUID.randomUUID().toString());
      }

      // Save or update the refresh token in the repository
      refreshToken = refreshTokenRepository.save(refreshToken);

      return refreshToken;
  }/*

 public RefreshToken createRefreshToken(Long userId) {
	
    RefreshToken refreshToken = new RefreshToken();

    refreshToken.setUser(userRepository.findById(userId).get());
    refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
    refreshToken.setToken(UUID.randomUUID().toString());

    refreshToken = refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }*/

  public RefreshToken verifyExpiration(RefreshToken token) {
    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(token);
      throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
    }

    return token;
  }

  @Transactional
  public int deleteByUserId(Long userId) {
    return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
  }
}
