package com.finalProject.controller;

import com.finalProject.service.CardPackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/store")
public class CardPackController {

    @Autowired
    private CardPackService cardPackService;

    @PostMapping("/purchase")
    public String purchasePack(@RequestParam Long userId, @RequestParam Long packId) {
        return cardPackService.purchasePack(userId, packId);
    }
}
