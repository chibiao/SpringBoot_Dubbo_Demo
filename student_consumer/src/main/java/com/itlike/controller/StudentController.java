package com.itlike.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.itlike.pojo.Student;
import com.itlike.service.StudentService;
import com.itlike.vo.AjaxRes;
import com.itlike.vo.PageListRes;
import com.itlike.vo.PageVo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * @author : 迟彪
 * @date : 2019/8/1
 */
@RestController
@RequestMapping("/student")
public class StudentController {
    @Reference
    StudentService studentService;

    @GetMapping("/studentList")
    public PageListRes studentList(PageVo vo) {
        return studentService.selectAllStudent(vo);
    }

    @PostMapping("/addStudent")
    public AjaxRes addStudent(@RequestParam(value = "file",name = "file") MultipartFile file, Student student, HttpServletRequest request) {
        if (file.isEmpty()) {
            System.out.println("文件为空空");
        }
        String fileName = file.getOriginalFilename();  // 文件名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));  // 后缀名
        String filePath = "D://upload//"; // 上传后的路径
        fileName = UUID.randomUUID() + suffixName; // 新文件名
        File dest = new File(filePath + fileName);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String filename = "/upload/" + fileName;
        student.setPhotopath(filename);
        return studentService.addStudent(student);
    }

    @PutMapping("/updateStudent")
    public AjaxRes updateStudent(@RequestParam(value = "file",name = "file") MultipartFile file, Student student, HttpServletRequest request) {
        if (file.isEmpty()) {
            System.out.println("文件为空空");
        }
        String fileName = file.getOriginalFilename();  // 文件名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));  // 后缀名
        String filePath = "D://upload//"; // 上传后的路径
        fileName = UUID.randomUUID() + suffixName; // 新文件名
        File dest = new File(filePath + fileName);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String filename = "/upload/" + fileName;
        student.setPhotopath(filename);
        return studentService.updateStudent(student);
    }

    @DeleteMapping("/deleteStudent/{id}")
    public AjaxRes deleteStudent(@PathVariable("id") Integer id) {
        System.out.println(id);
        return studentService.deleteStudent(id);
    }
}
