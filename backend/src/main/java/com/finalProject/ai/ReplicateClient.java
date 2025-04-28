package com.finalProject.ai;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class ReplicateClient {

    private static final String API_TOKEN = System.getenv("REPLICATE_API_TOKEN"); 
    private static final String API_URL = "https://api.replicate.com/v1/predictions";
    private static final String VERSION_ID = "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4";

    public static String generateImage(String prompt) throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        Map<String, Object> input = Map.of(
                "version", VERSION_ID,
                "input", Map.of(
                        "prompt", prompt,
                        "scheduler", "K_EULER"
                )
        );

        ObjectMapper mapper = new ObjectMapper();
        String requestBody = mapper.writeValueAsString(input);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .header("Authorization", "Token " + API_TOKEN)
                .header("Content-Type", "application/json")
                .header("Prefer", "wait")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper jsonMapper = new ObjectMapper();
        JsonNode root = jsonMapper.readTree(response.body());
        JsonNode outputNode = root.path("output");

        if (outputNode.isArray() && outputNode.size() > 0) {
            String imageUrl = outputNode.get(0).asText();
            System.out.println("✅ 生成成功：" + imageUrl);
            return imageUrl;
        } else {
            throw new RuntimeException("❌ 图像生成失败: " + response.body());
        }
    }

    public static void main(String[] args) throws Exception {
        String result = generateImage("Three Kingdoms style portrait of Lü Bu on horseback, dramatic background, hd");
        System.out.println("最终图像链接：" + result);
    }
}
