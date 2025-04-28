package com.finalProject.repository;

import com.finalProject.model.FamousStory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamousStoryRepository extends JpaRepository<FamousStory, Long> {
}
