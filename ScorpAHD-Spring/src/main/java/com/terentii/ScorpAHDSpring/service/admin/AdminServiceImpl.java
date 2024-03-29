package com.terentii.ScorpAHDSpring.service.admin;

import com.terentii.ScorpAHDSpring.model.Role;
import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;
import com.terentii.ScorpAHDSpring.model.User;
import com.terentii.ScorpAHDSpring.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    private final JavaMailSender javaMailSender;

    private final UserRepository userRepository;

    public AdminServiceImpl(UserRepository userRepository, JavaMailSender javaMailSender) {
        this.userRepository = userRepository;
        this.javaMailSender = javaMailSender;
    }

    @PostConstruct
    public void createAdminAccount() {
        List<User> adminList = userRepository.findAllByRole(Role.ADMIN);
        if (adminList.isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@test.com");
            admin.setRole(Role.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(admin);
        }
    }

    @Override
    public StudentDto postStudent(StudentDto studentDto) {
        Optional<User> optionalUser = userRepository.findByEmail(studentDto.getEmail());
        if (optionalUser.isEmpty()) {
            User user = new User();
            BeanUtils.copyProperties(studentDto, user);
            user.setPassword(new BCryptPasswordEncoder().encode(studentDto.getPassword()));
            user.setRole(Role.USER);
            User createdUser = userRepository.save(user);
            StudentDto createdStudentDto = new StudentDto();
            createdStudentDto.setId(createdUser.getId());
            createdStudentDto.setEmail(createdUser.getEmail());
            return createdStudentDto;
        }
        return null;
    }

    @Override
    public List<StudentDto> getAllStudents() {
        return userRepository.findAllByRole(Role.USER).stream().map(User::getStudentDto).collect(Collectors.toList());
    }

    @Override
    public void deleteStudentById(Long studentId) {
        userRepository.deleteById(studentId);
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
            user.setGender(studentDto.getGender());
            user.setEmail(studentDto.getEmail());
            user.setRoomNumber(studentDto.getRoomNumber());
            User updatedStudent = userRepository.save(user);
            StudentDto updatedStudentDto = new StudentDto();
            updatedStudentDto.setId(updatedStudent.getId());
            return updatedStudentDto;
        }
        return null;
    }

    public void sendMail(String to, String cc, String subject, String body, MultipartFile[] files) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(to);
            if (cc != null && !cc.isEmpty()) {
                mimeMessageHelper.setCc(cc);
            }
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body);

            if (files != null) {
                for (MultipartFile file : files) {
                    mimeMessageHelper.addAttachment(Objects.requireNonNull(file.getOriginalFilename()), file);
                }
            }

            javaMailSender.send(mimeMessage);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendMailToAllUsers(String subject, String body, MultipartFile[] files) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            sendMail(user.getEmail(), null, subject, body, files);
        }
    }
}
