package com.terentii.ScorpAHDSpring.service.admin;

import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminService {
    StudentDto postStudent(StudentDto studentDto);

    List<StudentDto> getAllStudents();

    void deleteStudentById(Long studentId);

    SingleStudentDto getStudentById(Long studentId);

    StudentDto updateStudent(Long studentId, StudentDto studentDto);

    void sendMail(String to, String cc, String subject, String body, MultipartFile[] file);

    void sendMailToAllUsers(String subject, String body, MultipartFile[] file);
}
