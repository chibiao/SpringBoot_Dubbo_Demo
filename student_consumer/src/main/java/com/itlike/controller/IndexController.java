package com.itlike.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author : 迟彪
 * @date : 2019/8/1
 */
@Controller
public class IndexController {
    @RequestMapping("/")
    public String index(){
        return "student";
    }
}
