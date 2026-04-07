package com.CabBooking.service;

import com.CabBooking.model.AppUser;
import com.CabBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository appUserRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 🔹 Register new user
    public AppUser registerUser(AppUser user) {
        // Check if email already exists
        Optional<AppUser> existingUser = appUserRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with email: " + user.getEmail());
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Default role as USER if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        return appUserRepository.save(user);
    }

    // 🔹 Authenticate user (for login)
    public AppUser authenticate(String email, String password) {
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }

    // 🔹 Alternative Signup (returns message instead of exception)
    public String signup(AppUser user) {
        if (appUserRepository.findByEmail(user.getEmail()).isPresent()) {
            return "❌ Email already registered!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(user.getRole() == null ? "USER" : user.getRole());
        appUserRepository.save(user);

        return "✅ Signup successful!";
    }

    // 🔹 Fetch user by email
    public Optional<AppUser> getUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }
}
