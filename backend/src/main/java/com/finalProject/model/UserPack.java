package com.finalProject.model;

import javax.persistence.*;

@Entity
@Table(name = "user_pack")
public class UserPack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "pack_id", nullable = false)
    private CardPack pack;

    @Column(nullable = false)
    private int quantity;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public CardPack getPack() { return pack; }
    public void setPack(CardPack pack) { this.pack = pack; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
