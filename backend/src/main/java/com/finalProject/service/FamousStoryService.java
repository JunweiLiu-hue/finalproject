package com.finalProject.service;

import com.finalProject.model.FamousStory;
import com.finalProject.repository.FamousStoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamousStoryService {

    @Autowired
    private FamousStoryRepository storyRepository;

    public List<FamousStory> getAllStories() {
        return storyRepository.findAll();
    }

    public FamousStory getStoryById(Long id) {
        return storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with id: " + id));
    }
}
