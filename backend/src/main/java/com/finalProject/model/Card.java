package com.finalProject.model;

import javax.persistence.*;

@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    private String name;
    private String imageUrl;

    // ✅ 新增 biography 字段
    @Column(columnDefinition = "TEXT")
    private String biography;

    @ManyToOne
    @JoinColumn(name = "rarity", referencedColumnName = "rarity")
    private RarityConfig rarityConfig;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // ===== Getters and Setters =====

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public RarityConfig getRarityConfig() {
        return rarityConfig;
    }

    public void setRarityConfig(RarityConfig rarityConfig) {
        this.rarityConfig = rarityConfig;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // ✅ biography Getter & Setter
    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }
}
