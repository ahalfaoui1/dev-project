package com.crm.backend.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.crm.backend.models.RefreshToken;
import com.crm.backend.models.User;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByToken(String token);
  Optional<RefreshToken> findByUser_Id(Long userId);  @Modifying
  
  
  int deleteByUser(User user);
}
