package com.terentii.ScorpAHDSpring.repository;

import com.terentii.ScorpAHDSpring.model.Role;
import com.terentii.ScorpAHDSpring.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByResetToken(String resetToken);
    List<User> findAllByRole(Role role);
}
