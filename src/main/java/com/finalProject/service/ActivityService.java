package com.finalProject.service;

import com.finalProject.model.Activity;
import com.finalProject.model.User;
import com.finalProject.model.UserActivity;
import com.finalProject.repository.ActivityRepository;
import com.finalProject.repository.UserActivityRepository;
import com.finalProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserActivityRepository userActivityRepository;

    @Autowired
    private UserRepository userRepository;

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
        userActivityRepository.save(userActivity);

        return "You have successfully joined the activity!";
    }

    public String completeActivity(Long userId, Long activityId) {
        Optional<UserActivity> userActOpt = userActivityRepository.findByUser_UserIdAndActivity_ActivityId(userId, activityId);
        if (!userActOpt.isPresent()) {
            return "You haven't joined this activity yet.";
        }

        UserActivity userActivity = userActOpt.get();
        if (!"IN_PROGRESS".equals(userActivity.getStatus())) {
            return "Activity is already completed or not in progress.";
        }

        userActivity.setStatus("COMPLETED");
        userActivityRepository.save(userActivity);

        Activity activity = userActivity.getActivity();
        Double reward = activity.getReward();

        User user = userActivity.getUser();
        user.setBalance(user.getBalance() + reward);
        userRepository.save(user);

        return "Activity completed! You earned " + reward + " coins.";
    }
}
