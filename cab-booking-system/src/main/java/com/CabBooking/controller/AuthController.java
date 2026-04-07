package com.CabBooking.controller;

import com.CabBooking.model.AppUser;
import com.CabBooking.security.JwtUtil;
import com.CabBooking.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔹 Signup API
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody AppUser user) {
        String message = userService.signup(user);
        return ResponseEntity.ok(message);
    }

    // 🔹 Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        var user = userService.getUserByEmail(email);

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String token = jwtUtil.generateToken(email, user.get().getRole());
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "role", user.get().getRole(),
                    "message", "✅ Login successful"
            ));
        }

        return ResponseEntity.status(401).body(Map.of("message", "❌ Invalid credentials"));
    }
}
