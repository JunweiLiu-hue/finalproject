package com.finalProject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    // 处理 GET 请求
    @GetMapping("/")
    public String helloGet() {
        return "Hello, World!";  // 返回消息
    }

    // 处理 POST 请求
    @PostMapping("/")
    public String helloPost() {
        return "Hello, World! POST";
    }
}
