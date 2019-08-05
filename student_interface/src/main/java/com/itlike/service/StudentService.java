package com.itlike.service;

import com.itlike.pojo.Student;
import com.itlike.vo.AjaxRes;
import com.itlike.vo.PageListRes;
import com.itlike.vo.PageVo;


/**
 * @author : 迟彪
 * @date : 2019/8/1
 */
public interface StudentService {
    AjaxRes addStudent(Student student);

    AjaxRes updateStudent(Student student);

    PageListRes selectAllStudent(PageVo vo);

    AjaxRes deleteStudent(Integer id);

    PageListRes selectStudentByKeyWord(String keyword);
}
