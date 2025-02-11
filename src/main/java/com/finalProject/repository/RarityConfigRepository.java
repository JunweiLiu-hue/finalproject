package com.finalProject.repository;

import com.finalProject.model.RarityConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RarityConfigRepository extends JpaRepository<RarityConfig, String> {
}
