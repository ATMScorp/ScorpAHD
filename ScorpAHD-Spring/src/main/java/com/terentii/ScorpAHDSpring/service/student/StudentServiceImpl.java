package com.terentii.ScorpAHDSpring.service.student;

import com.terentii.ScorpAHDSpring.model.user.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.user.StudentDto;
import com.terentii.ScorpAHDSpring.model.user.User;
import com.terentii.ScorpAHDSpring.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    private final UserRepository userRepository;

    public StudentServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public SingleStudentDto getStudentById(Long studentId) {
        Optional<User> optionalUser = userRepository.findById(studentId);
        SingleStudentDto singleStudentDto = new SingleStudentDto();
        optionalUser.ifPresent(user -> singleStudentDto.setStudentDto(user.getStudentDto()));
        return singleStudentDto;
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto studentDto) {
        Optional<User> optionalUser = userRepository.findById(studentId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstName(studentDto.getFirstName());
            user.setSecondName(studentDto.getSecondName());
            user.setDepartment(studentDto.getDepartment());
            user.setFieldOfStudy(studentDto.getFieldOfStudy());
            user.setAcademicYear(studentDto.getAcademicYear());
            user.setDateOfBirth(studentDto.getDateOfBirth());
            user.setAddress(studentDto.getAddress());
            User updatedStudent = userRepository.save(user);
            StudentDto updatedStudentDto = new StudentDto();
            updatedStudentDto.setId(updatedStudent.getId());
            return updatedStudentDto;
        }
        return null;
    }

    @Override
    public StudentDto changePassword(Long studentId, String currentPassword, String newPassword) {
        Optional<User> optionalUser = userRepository.findById(studentId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (encoder.matches(currentPassword, user.getPassword())) {
                user.setPassword(encoder.encode(newPassword));
                User updatedStudent = userRepository.save(user);
                StudentDto updatedStudentDto = new StudentDto();
                updatedStudentDto.setId(updatedStudent.getId());
                return updatedStudentDto;
            } else {
                throw new IllegalArgumentException("Current password is incorrect.");
            }
        }
        return null;
    }

}
