package com.finalProject.controller;

import com.finalProject.model.User;
import com.finalProject.service.CardPackService;
import com.finalProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CardPackService cardPackService;

    // 注册用户
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED); // 返回201状态
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // 返回400状态
        }
    }

    // 登录用户
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        try {
            User loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
            return new ResponseEntity<>(loggedInUser, HttpStatus.OK); // 返回200状态
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED); // 返回401状态
        }
    }

    @PostMapping("/openPack")
    public String openPack(@RequestParam Long userId, @RequestParam Long packId) {
        return cardPackService.openPack(userId, packId);
    }
}
