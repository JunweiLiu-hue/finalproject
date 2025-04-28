package com.finalProject.repository;

import com.finalProject.model.CardPack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardPackRepository extends JpaRepository<CardPack, Long> {

}
