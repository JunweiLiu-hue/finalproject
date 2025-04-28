package com.finalProject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 前端连接的地址，例如 ws://localhost:8080/ws
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS(); // 支持 SockJS 回退
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 以 /app 开头的消息会路由到 @MessageMapping 的方法中
        registry.setApplicationDestinationPrefixes("/app");

        // 以 /topic 或 /queue 开头的消息会被广播到订阅者
        registry.enableSimpleBroker("/topic", "/queue");
    }
}
