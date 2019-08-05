package com.tjetc;

import com.itlike.StudentProvider;
import com.itlike.pojo.Student;
import com.itlike.service.StudentService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author : 迟彪
 * @date : 2019/8/1
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StudentProvider.class)
public class StudentProviderTests {
    @Autowired
    StudentService studentService;
    @Test
    public void test(){
        Student student = new Student();
        student.setAge(15);
        studentService.addStudent(student);
    }
}
