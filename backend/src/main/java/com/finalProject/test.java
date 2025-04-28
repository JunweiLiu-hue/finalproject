package com.finalProject;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.apache.hc.core5.http.ContentType;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class test {
    private static final String API_URL = "http://127.0.0.1:3000/api/Feedbacks";
    private static final String AUTH_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MjIsInVzZXJuYW1lIjoiIiwiZW1haWwiOiIyMDEwOTIyMkBtYWlsLndpdC5pZSIsInBhc3N3b3JkIjoiN2QzZTVhMmI2M2JjNTE3ODlhYmE3ZjI4MzQzOWJkMjciLCJyb2xlIjoiY3VzdG9tZXIiLCJkZWx1eGVUb2tlbiI6IiIsImxhc3RMb2dpbklwIjoiMC4wLjAuMCIsInByb2ZpbGVJbWFnZSI6Ii9hc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHQuc3ZnIiwidG90cFNlY3JldCI6IiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDI1LTAzLTEyIDEzOjMwOjMwLjI0NCArMDA6MDAiLCJ1cGRhdGVkQXQiOiIyMDI1LTAzLTEyIDEzOjMwOjMwLjI0NCArMDA6MDAiLCJkZWxldGVkQXQiOm51bGx9LCJpYXQiOjE3NDE3ODY1OTR9.hhhhhVDuYz9z7XW2b1-94BREIpge043jZfYuFikrq0NKFheBtlcZD5HM4ey6bubeR8MRnokwHp4BtIAer-YWOPCpG7Jw-4FK2PukxjBX8SrfiKQWNqHRRPtdlz6oCBbhqNnBEm-rEIi9uzcjq-VY64ColGVCBDMPzoA3zdGn3R0"; // 你的 JWT 令牌

    private static void sendFeedback() {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost request = new HttpPost(API_URL);
            request.setHeader("Authorization", AUTH_TOKEN);
            request.setHeader("Content-Type", "application/json");

            String json = "{"
                    + "\"captcha\": \"14\","
                    + "\"captchaId\": 2,"
                    + "\"comment\": \"Automated CAPTCHA Bypass\","
                    + "\"rating\": 5,"
                    + "\"UserId\": 22"
                    + "}";
            request.setEntity(new StringEntity(json, ContentType.APPLICATION_JSON));

            try (CloseableHttpResponse response = httpClient.execute(request)) {
                System.out.println("Response: " + response.getCode());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(10);

        for (int i = 0; i < 10; i++) {
            executor.submit(test::sendFeedback);
        }

        executor.shutdown();
    }
}
