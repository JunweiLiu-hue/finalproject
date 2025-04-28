package com.finalProject.repository;

import com.finalProject.model.UserCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCardRepository extends JpaRepository<UserCard, Long> {

    List<UserCard> findByUser_UserId(Long userId);

    long countByUser_UserId(Long userId);

    List<UserCard> findByUser_UserIdAndCard_RarityConfig_Rarity(Long userId, String rarity);

    void deleteByUser_UserIdAndCard_CardId(Long userId, Long cardId);
}
