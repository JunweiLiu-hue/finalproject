package com.finalProject.controller;

import com.finalProject.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // 处理全局广播消息（所有订阅了 /topic/public 的用户都会收到）
    @MessageMapping("/chat/public")
    @SendTo("/topic/public")
    public ChatMessage broadcast(ChatMessage message) {
        // 可以在这里设置时间戳、过滤敏感词等
        return message;
    }

    // 处理私聊消息
    @MessageMapping("/chat/private")
    public void sendPrivateMessage(ChatMessage message, @Header("simpSessionId") String sessionId) {
        String targetUser = message.getReceiver(); // 自定义字段
        messagingTemplate.convertAndSend("/queue/private/" + targetUser, message);
    }
}
