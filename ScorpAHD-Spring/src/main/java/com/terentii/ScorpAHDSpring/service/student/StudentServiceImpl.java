package com.terentii.ScorpAHDSpring.service.student;

import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;
import com.terentii.ScorpAHDSpring.model.User;
import com.terentii.ScorpAHDSpring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService{

    private final UserRepository userRepository;

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
            user.setPassword(new BCryptPasswordEncoder().encode(studentDto.getPassword()));
            User updatedStudent = userRepository.save(user);
            StudentDto updatedStudentDto = new StudentDto();
            updatedStudentDto.setId(updatedStudent.getId());
            return updatedStudentDto;
        }
        return null;
    }
}
