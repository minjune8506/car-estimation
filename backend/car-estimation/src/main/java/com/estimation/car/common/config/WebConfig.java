package com.estimation.car.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${env.cors.frontend}")
    private String frontEndUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        long maxAge = 1800; // 30M

        registry.addMapping("/api/**")
                .allowedOrigins(frontEndUrl)
                .allowedMethods("GET")
                .maxAge(maxAge);
    }
}
