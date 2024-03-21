package com.terentii.ScorpAHDSpring.service.student;

import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;

public interface StudentService {
    SingleStudentDto getStudentById(Integer studentId);

    StudentDto updateStudent(Integer studentId, StudentDto studentDto);
}
