package com.itlike.mapper;

import com.itlike.pojo.Student;
import com.itlike.vo.PageVo;

import java.util.List;

public interface StudentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Student record);

    Student selectByPrimaryKey(Integer id);

    List<Student> selectAll(PageVo vo);

    int updateByPrimaryKey(Student record);
}