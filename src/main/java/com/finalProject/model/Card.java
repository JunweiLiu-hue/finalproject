package com.finalProject.model;

import javax.persistence.*;

@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(nullable = false, length = 255)
    private String name;

    @ManyToOne
    @JoinColumn(name = "rarity", referencedColumnName = "rarity", nullable = false)
    private RarityConfig rarityConfig;

    @Column(length = 1000)
    private String description;

    // Getters and Setters
    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RarityConfig getRarityConfig() {
        return rarityConfig;
    }

    public void setRarityConfig(RarityConfig rarityConfig) {
        this.rarityConfig = rarityConfig;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
