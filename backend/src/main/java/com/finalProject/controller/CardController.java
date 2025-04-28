package com.finalProject.controller;

import com.finalProject.ai.ReplicateClient;
import com.finalProject.model.Card;
import com.finalProject.model.User;
import com.finalProject.model.UserCard;
import com.finalProject.repository.CardRepository;
import com.finalProject.repository.UserCardRepository;
import com.finalProject.repository.UserRepository;
import com.finalProject.service.CardService;
import com.finalProject.service.UserService;
import com.finalProject.util.ImageDownloader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private UserCardRepository userCardRepository;

    @PostMapping("/draw")
    public Card drawCard(@RequestParam Long userId) {
        return cardService.drawCard(userId);
    }

    @GetMapping("/userCards")
    public List<Map<String, Object>> getUserCards(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Long userId = userService.getByUsername(username).getUserId();
        List<Card> cards = cardService.getUserCards(userId);

        return cards.stream().map(card -> {
            Map<String, Object> map = new HashMap<>();
            map.put("cardId", card.getCardId());
            map.put("name", card.getName());
            map.put("imageUrl", card.getImageUrl());  // ✅ 关键：把图片地址也带上
            map.put("rarityConfig", card.getRarityConfig());
            return map;
        }).collect(Collectors.toList());
    }



    @GetMapping("/getCardDetails/{cardId}")
    public Card getCardDetails(@PathVariable Long cardId) {
        return cardService.getCardDetails(cardId);
    }

    @PostMapping("/generate-image")
    public Card generateImageAndSave(@RequestBody Map<String, String> request, Principal principal) {
        String description = request.get("description");
        if (description == null || description.isBlank()) {
            throw new IllegalArgumentException("Missing or empty description");
        }

        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            // 1. 生成远程图像 URL
            String remoteUrl = ReplicateClient.generateImage(description);
            String fileName = ImageDownloader.downloadImageToLocal(remoteUrl);

            // 2. 创建卡牌对象
            Card card = new Card();
            card.setName(description.trim());
            card.setImageUrl("/static/img/" + fileName);
            card.setBiography("This card was designed by AI based on your input.\n\n" + description.trim());
            card.setUser(user);
            card.setRarityConfig(cardService.getCustomRarity());

            // 3. 保存卡牌
            Card savedCard = cardRepository.save(card);

            // ✅ 4. 建立用户与卡牌关联（新增的）
            UserCard userCard = new UserCard();
            userCard.setUser(user);
            userCard.setCard(savedCard);
            userCardRepository.save(userCard);

            return savedCard;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Image generation failed: " + e.getMessage());
        }
    }





}
