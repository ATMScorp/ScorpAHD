package com.terentii.ScorpAHDSpring.service.student;

import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;

public interface StudentService {
    SingleStudentDto getStudentById(Long studentId);

    StudentDto updateStudent(Long studentId, StudentDto studentDto);
}
