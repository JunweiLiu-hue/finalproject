package com.finalProject.controller;

import com.finalProject.model.CardPack;
import com.finalProject.model.UserPack;
import com.finalProject.service.CardPackService;
import com.finalProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store")
public class CardPackController {

    @Autowired
    private CardPackService cardPackService;

    @Autowired
    private UserService userService;

    // ✅ 购买卡包（使用 JWT 获取用户）
    @PostMapping("/buyPack")
    public String buyPack(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long packId,
            @RequestParam(defaultValue = "1") int quantity
    ) {
        String username = userDetails.getUsername();
        Long userId = userService.getByUsername(username).getUserId();
        return cardPackService.buyPack(userId, packId, quantity);
    }

    // ✅ 获取所有卡包
    @GetMapping("/getAllPacks")
    public List<CardPack> getAllCardPacks() {
        return cardPackService.getAllCardPacks();
    }

    // ✅ 获取指定卡包信息
    @GetMapping("/getPack/{packId}")
    public CardPack getCardPackById(@PathVariable Long packId) {
        return cardPackService.getCardPackById(packId);
    }

    // ✅ 获取用户仓库中的卡包（使用 JWT）
    @GetMapping("/userWarehouse")
    public List<UserPack> getUserWarehouse(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Long userId = userService.getByUsername(username).getUserId();

        List<UserPack> userPacks = cardPackService.getUserWarehouse(userId);

        // ✅ 打印日志检查数据
        System.out.println("User Warehouse for userId: " + userId);
        for (UserPack userPack : userPacks) {
            System.out.println("Pack: " + userPack.getPack().getName() + ", Quantity: " + userPack.getQuantity());
        }

        return userPacks;
    }
}
