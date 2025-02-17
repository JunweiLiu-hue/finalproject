package com.finalProject.controller;

import com.finalProject.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @PostMapping("/join")
    public String joinActivity(@RequestParam Long userId, @RequestParam Long activityId) {
        return activityService.joinActivity(userId, activityId);
    }

    @PostMapping("/complete")
    public String completeActivity(@RequestParam Long userId, @RequestParam Long activityId) {
        return activityService.completeActivity(userId, activityId);
    }
}
