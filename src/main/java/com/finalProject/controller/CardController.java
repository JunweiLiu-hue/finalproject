package com.finalProject.controller;

import com.finalProject.model.Card;
import com.finalProject.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping("/draw/{userId}")
    public Card drawCard(@PathVariable Long userId) {
        return cardService.drawCard(userId);
    }

    @GetMapping("/user/{userId}")
    public List<Card> getUserCards(@PathVariable Long userId) {
        return cardService.getUserCards(userId);
    }
}
