package com.finalProject.service;

import com.finalProject.model.*;
import com.finalProject.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private RarityConfigRepository rarityConfigRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCardRepository userCardRepository;

    @Autowired
    private UserPackRepository userPackRepository;

    private final Random random = new Random();

    // 获取随机稀有度
    private String getRandomRarity() {
        List<RarityConfig> rarities = rarityConfigRepository.findAll();
        double randomValue = random.nextDouble() * 100;
        double cumulativeProbability = 0.0;

        for (RarityConfig rarity : rarities) {
            cumulativeProbability += rarity.getProbability();
            if (randomValue <= cumulativeProbability) {
                return rarity.getRarity();
            }
        }
        return "Common";
    }

    // 根据稀有度随机获取一张卡
    private Card getRandomCardByRarity(String rarity) {
        List<Card> cards = cardRepository.findByRarityConfig_Rarity(rarity);
        if (cards.isEmpty()) return null;
        return cards.get(random.nextInt(cards.size()));
    }

    // 用户"开卡包"，抽取卡片
    @Transactional
    public Card openPack(Long userId, Long packId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found");
        }

        Optional<UserPack> userPackOptional = userPackRepository.findByUser_UserIdAndPack_PackId(userId, packId);
        if (!userPackOptional.isPresent()) {
            throw new RuntimeException("No packs available for this user.");
        }

        UserPack userPack = userPackOptional.get();
        if (userPack.getQuantity() <= 0) {
            throw new RuntimeException("No packs left to open.");
        }

        // 调用 drawCard 进行抽卡
        Card drawnCard = drawCard(userId);

        // 减少卡包数量
        userPack.setQuantity(userPack.getQuantity() - 1);
        if (userPack.getQuantity() == 0) {
            userPackRepository.delete(userPack);
        } else {
            userPackRepository.save(userPack);
        }

        return drawnCard;
    }

    // 直接抽取卡片
    @Transactional
    public Card drawCard(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found");
        }

        String rarity = getRandomRarity();
        Card card = getRandomCardByRarity(rarity);
        if (card == null) {
            throw new RuntimeException("No cards found for rarity: " + rarity);
        }

        // 保存抽取的卡片到用户的 `user_card` 表
        UserCard userCard = new UserCard();
        userCard.setUser(userOptional.get());
        userCard.setCard(card);
        userCardRepository.save(userCard);

        return card;
    }

    // 获取用户的所有卡片
    public List<Card> getUserCards(Long userId) {
        List<UserCard> userCards = userCardRepository.findByUser_UserId(userId);
        List<Card> cards = new ArrayList<>();
        for (UserCard uc : userCards) {
            cards.add(uc.getCard());
        }
        return cards;
    }
}
