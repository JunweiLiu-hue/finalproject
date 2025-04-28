package com.finalProject.util;

import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ImageDownloader {

    public static String downloadImageToLocal(String remoteUrl) throws Exception {
        // 生成唯一文件名
        String fileName = "out-" + System.currentTimeMillis() + ".png";

        // 本地保存路径（Nginx 映射的静态资源路径）
        String localPath = "/var/www/html/static/img/" + fileName;

        // 下载远程图片并保存
        try (InputStream in = new URL(remoteUrl).openStream()) {
            Files.copy(in, Paths.get(localPath));
        }

        // 返回文件名供前端拼接（前端拼为 /static/img/xxx.png）
        return fileName;
    }
}
