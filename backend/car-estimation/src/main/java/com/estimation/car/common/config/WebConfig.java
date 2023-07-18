package com.estimation.car.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final String frontEndUrl = "http://localhost:5173";
    private final long maxAge = 1800; // 30M

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(frontEndUrl)
                .allowedMethods("GET")
                .maxAge(maxAge);
    }
}
