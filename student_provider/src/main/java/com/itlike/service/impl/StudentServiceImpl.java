package com.itlike.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.itlike.mapper.StudentMapper;
import com.itlike.pojo.Student;
import com.itlike.service.StudentService;
import com.itlike.vo.AjaxRes;
import com.itlike.vo.PageListRes;
import com.itlike.vo.PageVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author : 迟彪
 * @date : 2019/8/1
 */
@Component
@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public AjaxRes addStudent(Student student) {
        AjaxRes ajaxRes = new AjaxRes();
        try {
            studentMapper.insert(student);
            ajaxRes.setSuccess(true);
            ajaxRes.setMsg("添加成功");
        }catch (Exception e){
            ajaxRes.setSuccess(false);
            ajaxRes.setMsg("添加失败");
        }
        return ajaxRes;
    }

    @Override
    public AjaxRes updateStudent(Student student) {
        AjaxRes ajaxRes = new AjaxRes();
        try {
            studentMapper.updateByPrimaryKey(student);
            ajaxRes.setSuccess(true);
            ajaxRes.setMsg("修改成功");
        }catch (Exception e){
            ajaxRes.setSuccess(false);
            ajaxRes.setMsg("修改失败");
        }
        return ajaxRes;
    }

    @Override
    public PageListRes selectAllStudent(PageVo vo) {
        PageListRes pageListRes = new PageListRes();
        Page<Object> page = PageHelper.startPage(vo.getPage(), vo.getLimit());
        List<Student> students = studentMapper.selectAll(vo);
        pageListRes.setCount(page.getTotal());
        pageListRes.setData(students);
        pageListRes.setCode(0);
        return pageListRes;
    }

    @Override
    public AjaxRes deleteStudent(Integer id) {
        AjaxRes ajaxRes = new AjaxRes();
        try {
            studentMapper.deleteByPrimaryKey(id);
            ajaxRes.setSuccess(true);
            ajaxRes.setMsg("删除成功");
        }catch (Exception e){
            ajaxRes.setSuccess(false);
            ajaxRes.setMsg("删除失败");
        }
        return ajaxRes;
    }

    @Override
    public PageListRes selectStudentByKeyWord(String keyword) {
        return null;
    }
}
