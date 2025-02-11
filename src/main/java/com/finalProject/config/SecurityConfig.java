package com.finalProject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // 禁用 CSRF（开发时方便，生产环境中可考虑保留）
                .authorizeRequests()
                .antMatchers("/user/register", "/user/login", "/static/**").permitAll()  // 允许访问注册和登录接口
                .anyRequest().permitAll()  // 所有请求都可以访问
                .and()
                .formLogin().disable();  // 禁用默认登录页，避免自动重定向到登录页面
    }
}
