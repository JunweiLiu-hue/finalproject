package com.finalProject.config;

public class ImageUrlUtil {
    private static final String BASE_URL = "http://http://54.155.202.250//static/img/";

    public static String formatImageUrl(String name) {
        if (name == null) return null;
        String filename = name.trim().replaceAll("\\s+", "-") + ".jpg";
        return BASE_URL + filename;
    }
}
