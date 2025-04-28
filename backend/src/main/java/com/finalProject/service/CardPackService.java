package com.finalProject.service;

import com.finalProject.model.*;
import com.finalProject.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CardPackService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardPackRepository cardPackRepository;

    @Autowired
    private UserPackRepository userPackRepository;

    @Autowired
    private CardService cardService; // ✅ 直接调用 CardService 里的抽卡方法

    public List<CardPack> getAllCardPacks() {
        return cardPackRepository.findAll();
    }

    public CardPack getCardPackById(Long packId) {
        return cardPackRepository.findById(packId).orElse(null);
    }

    @Transactional
    public String buyPack(Long userId, Long packId, int quantity) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<CardPack> packOpt = cardPackRepository.findById(packId);

        if (!userOpt.isPresent()) return "User not found.";
        if (!packOpt.isPresent()) return "Card pack not found.";

        User user = userOpt.get();
        CardPack pack = packOpt.get();
        double totalCost = pack.getPrice() * quantity;

        if (user.getBalance() < totalCost) {
            return "Insufficient balance.";
        }

        user.setBalance(user.getBalance() - totalCost);
        userRepository.save(user);

        // 检查用户是否已购买该卡包
        Optional<UserPack> userPackOpt = userPackRepository.findByUser_UserIdAndPack_PackId(userId, packId);
        if (userPackOpt.isPresent()) {
            UserPack userPack = userPackOpt.get();
            userPack.setQuantity(userPack.getQuantity() + quantity);
            userPackRepository.save(userPack);
        } else {
            UserPack newUserPack = new UserPack();
            newUserPack.setUser(user);
            newUserPack.setPack(pack);
            newUserPack.setQuantity(quantity);
            userPackRepository.save(newUserPack);
        }

        return "Purchase successful!";
    }

    // **✅ 开启卡包（调用 CardService 抽取卡牌）**
    @Transactional
    public String openPack(Long userId, Long packId) {
        Optional<UserPack> userPackOpt = userPackRepository.findByUser_UserIdAndPack_PackId(userId, packId);
        if (!userPackOpt.isPresent()) {
            return "You do not have this card pack.";
        }

        UserPack userPack = userPackOpt.get();
        if (userPack.getQuantity() <= 0) {
            return "No packs left to open.";
        }

        // ✅ 直接调用 `CardService.drawCard()`
        Card drawnCard = cardService.drawCard(userId);
        if (drawnCard == null) {
            return "Error: No valid cards found!";
        }

        // ✅ 减少卡包数量
        userPack.setQuantity(userPack.getQuantity() - 1);
        if (userPack.getQuantity() == 0) {
            userPackRepository.delete(userPack);
        } else {
            userPackRepository.save(userPack);
        }

        return "You opened a pack and got " + drawnCard.getName() + "!";
    }

    public List<UserPack> getUserWarehouse(Long userId) {
        return userPackRepository.findByUser_UserId(userId);
    }


}
