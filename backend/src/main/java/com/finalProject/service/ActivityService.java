package com.finalProject.service;

import com.finalProject.model.Activity;
import com.finalProject.model.User;
import com.finalProject.model.UserActivity;
import com.finalProject.repository.ActivityRepository;
import com.finalProject.repository.UserActivityRepository;
import com.finalProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserActivityRepository userActivityRepository;

    @Autowired
    private UserRepository userRepository;

    // 加入活动（只需加入一次）
    public String joinActivity(Long userId, Long activityId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return "User not found.";
        }

        Optional<Activity> activityOpt = activityRepository.findById(activityId);
        if (!activityOpt.isPresent()) {
            return "Activity not found.";
        }

        Activity activity = activityOpt.get();
        if (!activity.getActive()) {
            return "This activity is not active.";
        }

        Optional<UserActivity> userActOpt = userActivityRepository.findByUser_UserIdAndActivity_ActivityId(userId, activityId);
        if (userActOpt.isPresent()) {
            return "You have already joined this activity.";
        }

        User user = userOpt.get();
        UserActivity userActivity = new UserActivity();
        userActivity.setUser(user);
        userActivity.setActivity(activity);
        userActivity.setStatus("IN_PROGRESS");
        userActivity.setLastCompletedDate(null); // 还未完成
        userActivityRepository.save(userActivity);

        return "You have successfully joined the activity!";
    }

    // 每日完成活动逻辑（可以每天完成一次）
    public String completeActivity(Long userId, Long activityId) {
        Optional<UserActivity> userActOpt = userActivityRepository.findByUser_UserIdAndActivity_ActivityId(userId, activityId);
        if (!userActOpt.isPresent()) {
            return "You haven't joined this activity yet.";
        }

        UserActivity userActivity = userActOpt.get();
        LocalDate today = LocalDate.now();

        // 判断今天是否完成过
        if (userActivity.getLastCompletedDate() != null &&
                userActivity.getLastCompletedDate().isEqual(today)) {
            return "You have already completed this activity today.";
        }

        // 更新完成状态为今天
        userActivity.setStatus("COMPLETED");
        userActivity.setLastCompletedDate(today);
        userActivityRepository.save(userActivity);

        // 发放奖励
        Activity activity = userActivity.getActivity();
        Double reward = activity.getReward();

        User user = userActivity.getUser();
        user.setBalance(user.getBalance() + reward);
        userRepository.save(user);

        return "Activity completed! You earned " + reward + " coins.";
    }

    // 获取当前用户所有活动状态列表（仅按今天判断是否完成）
    public List<Map<String, Object>> getUserActivityList(Long userId) {
        List<Activity> allActivities = activityRepository.findAll();
        List<UserActivity> userActivities = userActivityRepository.findByUser_UserId(userId);

        Map<Long, String> userStatusMap = new HashMap<>();
        LocalDate today = LocalDate.now();

        for (UserActivity ua : userActivities) {
            if (ua.getLastCompletedDate() != null && ua.getLastCompletedDate().isEqual(today)) {
                userStatusMap.put(ua.getActivity().getActivityId(), "COMPLETED");
            } else {
                userStatusMap.put(ua.getActivity().getActivityId(), "IN_PROGRESS");
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Activity activity : allActivities) {
            if (!activity.getActive()) continue;

            Map<String, Object> map = new HashMap<>();
            map.put("activityId", activity.getActivityId());
            map.put("name", activity.getName());
            map.put("description", activity.getDescription());
            map.put("reward", activity.getReward());
            map.put("status", userStatusMap.getOrDefault(activity.getActivityId(), "NOT_JOINED"));

            result.add(map);
        }

        return result;
    }
}
