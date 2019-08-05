package com.itlike.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author : 迟彪
 * @date : 2019/8/2
 */
@Configuration
public class MySpringMVCConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //将磁盘路径映射为资源路径
        registry.addResourceHandler("/upload/**").addResourceLocations("file:D:/upload/");
    }
}
