package com.finalProject.repository;

import com.finalProject.model.RarityConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RarityConfigRepository extends JpaRepository<RarityConfig, String> {

    Optional<RarityConfig> findByRarity(String rarity);
}
