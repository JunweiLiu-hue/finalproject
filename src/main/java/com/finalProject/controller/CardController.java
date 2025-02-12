package com.finalProject.controller;

import com.finalProject.model.Card;
import com.finalProject.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping("/draw")
    public Card drawCard(@RequestParam Long userId) {
        return cardService.drawCard(userId);
    }
}
