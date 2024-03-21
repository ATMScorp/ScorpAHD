package com.terentii.ScorpAHDSpring.service;

import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;

import java.util.List;

public interface AdminService {
    StudentDto postStudent(StudentDto studentDto);

    List<StudentDto> getAllStudents();

    void deleteStudent(Integer studentId);

    SingleStudentDto getStudentById(Integer studentId);

    StudentDto updateStudent(Integer studentId, StudentDto studentDto);
}
