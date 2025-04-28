package com.finalProject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "rarity_config")
public class RarityConfig {

    @Id
    @Column(length = 50)
    private String rarity;

    @Column(nullable = false)
    private Double probability;

    // Getters and Setters
    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity;
    }

    public Double getProbability() {
        return probability;
    }

    public void setProbability(Double probability) {
        this.probability = probability;
    }
}
