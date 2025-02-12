package com.finalProject.controller;

import com.finalProject.service.CardPackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/store")
public class CardPackController {

    @Autowired
    private CardPackService cardPackService;

    @PostMapping("/buyPack")
    public String buyPack(@RequestParam Long userId, @RequestParam Long packId, @RequestParam(defaultValue = "1") int quantity) {
        return cardPackService.buyPack(userId, packId, quantity);
    }


}
