package com.finalProject.controller;

import com.finalProject.model.User;
import com.finalProject.model.Card;
import com.finalProject.model.UserUpdateRequest;
import com.finalProject.repository.UserRepository;
import com.finalProject.security.JwtUtil;
import com.finalProject.service.CardService;
import com.finalProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CardService cardService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    private final String AVATAR_UPLOAD_DIR = "/var/www/html/static/avatar/";

    // ✅ 开卡包接口（基于登录用户）
    @PostMapping("/openPack")
    public ResponseEntity<?> openPack(@RequestParam Long packId, Principal principal) {
        try {
            String username = principal.getName();
            User user = userService.getByUsername(username);
            Long userId = user.getUserId();

            Card card = cardService.openPack(userId, packId);
            return ResponseEntity.ok(card);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Open pack failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    // ✅ 获取当前登录用户信息
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
            }

            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            User user = userService.getByUsername(username);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UserUpdateRequest request
    ) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
            }

            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            User user = userService.getByUsername(username);

            if (request.getAvatarUrl() != null) {
                user.setAvatarUrl(request.getAvatarUrl());
            }

            if (request.getEmail() != null) {
                user.setEmail(request.getEmail());
            }

            userRepository.save(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Failed to update profile: " + e.getMessage());
        }
    }

    @PostMapping("/upload/avatar")
    public ResponseEntity<?> uploadAvatar(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String authHeader) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Empty file.");
            }

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
            }

            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            User user = userService.getByUsername(username);

            String fileName = username + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String savePath = "/var/www/html/static/img/" + fileName;
            File dest = new File(savePath);

            file.transferTo(dest); // ❗写文件这里可能会报错，要 catch

            String imageUrl = "http://54.155.202.250/static/img/" + fileName;
            user.setAvatarUrl(imageUrl);
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("avatarUrl", imageUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }



    // ✅ 获取指定用户（可选）
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }
}
