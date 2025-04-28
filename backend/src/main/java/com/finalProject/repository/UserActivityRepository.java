package com.finalProject.repository;

import com.finalProject.model.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {

    List<UserActivity> findByUser_UserId(Long userId);

    Optional<UserActivity> findByUser_UserIdAndActivity_ActivityId(Long userId, Long activityId);

}
