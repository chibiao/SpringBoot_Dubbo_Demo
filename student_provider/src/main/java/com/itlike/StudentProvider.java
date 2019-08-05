package com.itlike;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.DispatcherServlet;

/**
 * @author : 迟彪
 * @date : 2019/8/1
 */
@SpringBootApplication
@EnableDubboConfiguration
@MapperScan("com.itlike.mapper")
public class StudentProvider {
    public static void main(String[] args) {
        SpringApplication.run(StudentProvider.class,args);
    }
}
