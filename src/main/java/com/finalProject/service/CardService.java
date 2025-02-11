package com.finalProject.service;

import com.finalProject.model.Card;
import com.finalProject.model.RarityConfig;
import com.finalProject.model.User;
import com.finalProject.model.UserCard;
import com.finalProject.repository.CardRepository;
import com.finalProject.repository.RarityConfigRepository;
import com.finalProject.repository.UserCardRepository;
import com.finalProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    private final Random random = new Random();

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

    private Card getRandomCardByRarity(String rarity) {
        List<Card> cards = cardRepository.findByRarityConfig_Rarity(rarity);
        if (cards.isEmpty()) return null;
        return cards.get(random.nextInt(cards.size()));
    }

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

        UserCard userCard = new UserCard();
        userCard.setUser(userOptional.get());
        userCard.setCard(card);
        userCardRepository.save(userCard);

        return card;
    }

    public List<Card> getUserCards(Long userId) {
        List<UserCard> userCards = userCardRepository.findByUser_UserId(userId);
        List<Card> cards = new ArrayList<>();
        for (UserCard uc : userCards) {
            cards.add(uc.getCard());
        }
        return cards;
    }
}
