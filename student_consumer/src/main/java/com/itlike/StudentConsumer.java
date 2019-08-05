package com.itlike;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author : 迟彪
 * @date : 2019/8/1
 */
@SpringBootApplication
@EnableDubboConfiguration
public class StudentConsumer {
    public static void main(String[] args) {
        SpringApplication.run(StudentConsumer.class,args);
    }
}
