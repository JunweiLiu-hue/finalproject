package com.finalProject.service;

import com.finalProject.model.Card;
import com.finalProject.model.CardPack;
import com.finalProject.model.User;
import com.finalProject.model.UserCard;
import com.finalProject.repository.CardPackRepository;
import com.finalProject.repository.UserRepository;
import com.finalProject.repository.UserCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CardPackService {

    @Autowired
    private CardPackRepository cardPackRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCardRepository userCardRepository;

    @Transactional
    public String purchasePack(Long userId, Long packId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<CardPack> packOptional = cardPackRepository.findById(packId);

        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found.");
        }

        if (!packOptional.isPresent()) {
            throw new RuntimeException("Card pack not found.");
        }

        User user = userOptional.get();
        CardPack pack = packOptional.get();

        if (user.getBalance() < pack.getPrice()) {
            return "Insufficient balance.";
        }

        user.setBalance(user.getBalance() - pack.getPrice());
        userRepository.save(user);

        String result = "You have successfully purchased the " + pack.getName() + "!";
        return result;
    }
}
