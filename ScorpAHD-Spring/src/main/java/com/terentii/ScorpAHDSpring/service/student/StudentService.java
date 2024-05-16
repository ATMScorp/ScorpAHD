package com.terentii.ScorpAHDSpring.service.student;

import com.terentii.ScorpAHDSpring.model.user.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.user.StudentDto;

public interface StudentService {
    SingleStudentDto getStudentById(Long studentId);

    StudentDto updateStudent(Long studentId, StudentDto studentDto);

    StudentDto changePassword(Long studentId, String currentPassword, String newPassword);
}
