package com.finalProject.controller;

import com.finalProject.model.User;
import com.finalProject.service.ActivityService;
import com.finalProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @Autowired
    private UserService userService;

    // ✅ 从 Principal 自动识别 user
    @PostMapping("/join")
    public String joinActivity(@RequestParam Long activityId, Principal principal) {
        String username = principal.getName();
        User user = userService.getByUsername(username);
        return activityService.joinActivity(user.getUserId(), activityId);
    }

    // ✅ 完成活动接口
    @PostMapping("/complete")
    public String completeActivity(@RequestParam Long activityId, Principal principal) {
        String username = principal.getName();
        User user = userService.getByUsername(username);
        return activityService.completeActivity(user.getUserId(), activityId);
    }

    // ✅ 获取用户活动列表接口
    @GetMapping("/list")
    public List<Map<String, Object>> getUserActivities(Principal principal) {
        String username = principal.getName();
        User user = userService.getByUsername(username);
        return activityService.getUserActivityList(user.getUserId());
    }
}
