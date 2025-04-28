package com.finalProject.controller;

import com.finalProject.model.FamousStory;
import com.finalProject.service.FamousStoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/story") // ✅ 注意这里改为单数，与你前端路径一致
public class FamousStoryController {

    @Autowired
    private FamousStoryService storyService;

    // ✅ 获取所有故事（注意路径是 /all）
    @GetMapping("/all")
    public List<FamousStory> getAllStories() {
        return storyService.getAllStories();
    }

    // ✅ 获取指定故事的详细内容
    @GetMapping("/{id}")
    public FamousStory getStoryById(@PathVariable Long id) {
        return storyService.getStoryById(id);
    }
}
