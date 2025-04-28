package com.finalProject.repository;

import com.finalProject.model.UserPack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserPackRepository extends JpaRepository<UserPack, Long> {
    Optional<UserPack> findByUser_UserIdAndPack_PackId(Long userId, Long packId);
    List<UserPack> findByUser_UserId(Long userId);

}
